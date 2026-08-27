import rideModel from "../models/ride.model.js";
import captainModel from "../models/captain.model.js";
import { findCaptainIdsInGeoRadius } from "./redis/redisCaptainGeo.service.js";

import {
  getDistanceTimeService,
  getAddressCoordinateService,
} from "./map.service.js";

import crypto from "crypto";

/**
 * @name calculateFareService
 * @description Calculate fare estimate for auto, car, and moto based on distance and time
 * @param {string} pickup - Origin address or coordinates
 * @param {string} destination - Destination address or coordinates
 * @returns {Promise<{auto:number, car:number, moto:number}>} returns fare estimates for each vehicle type {auto, car, moto}
 */
async function calculateFareService(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    // Convert pickup and destination names into coordinates
    const pickupCoords = await getAddressCoordinateService(pickup);
    const destinationCoords = await getAddressCoordinateService(destination);

    // Format as "lng,lat" strings
    const pickupStr = `${pickupCoords.longitude},${pickupCoords.latitude}`;
    const destinationStr = `${destinationCoords.longitude},${destinationCoords.latitude}`;
    
    const { distance, duration } = await getDistanceTimeService(pickupStr, destinationStr);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(
            baseFare.auto +
            distance * perKmRate.auto +
            duration * perMinuteRate.auto
        ),

        car: Math.round(
            baseFare.car +
            distance * perKmRate.car +
            duration * perMinuteRate.car
        ),

        moto: Math.round(
            baseFare.moto +
            distance * perKmRate.moto +
            duration * perMinuteRate.moto
        )
    };

    return { fare, distance, duration };
}


/**
 * @name generateOtp
 * @description Generate a random numeric OTP of given length (num)  -- a helper function
 * @param {number} num - Length of OTP
 * @returns {string} - returns a generated OTP
 */
function generateOtp(num) {

    return crypto
        .randomInt(
            Math.pow(10, num - 1),
            Math.pow(10, num)
        )
        .toString();
}


/**
 * @name createRideService
 * @description Create a new ride document in DB
 * @param {Object} params - Ride details
 * @param {Object} params.user - User object
 * @param {string} params.pickup - Pickup address
 * @param {string} params.destination - Destination address
 * @param {string} params.vehicleType - Vehicle type (auto, car, moto)
 * @returns {Promise<Object>}  returns created ride document : ride object with user, pickup, destination, fare, OTP and status
 */
async function createRideService({user, pickup, destination, vehicleType}) {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    // Calculate fare
    const { fare, distance, duration } = await calculateFareService(pickup, destination);

    // Generate OTP
    const otp = generateOtp(6);

    // Create ride
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp,
        fare: fare[vehicleType],
        distance,
        duration,
        status: "pending"
    });

    return ride;
}


/**
 * @name confirmRideService
 * @description Captain confirms a ride
 * @param {Object} params - Ride confirmation details
 * @param {string} params.rideId - Ride ID
 * @param {Object} params.captain - Captain object
 * @returns {Promise<Object>} - Updated ride document : ride object with user details, captain details
 */
async function confirmRideService({rideId, captain}) {

    if (!rideId) {
        throw new Error("Ride id is required");
    }

    // find and update the ride then fetch the updated ride with populated user and captain details , here we hid the OTP because it must never be sent to the captain.The OTP is generated during ride creation and should be provided only to the user.
    const ride = await rideModel.findOneAndUpdate(
        {
            _id: rideId,
            status: "pending"
        },
        {
            status: "accepted",
            captain: captain._id
        },
        {
            returnDocument: "after"
        }
    )
    .select("+otp")
    .populate("user")
    .populate("captain");

    console.log("inside ride service : ride :" , ride)

    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
}


/**
 * @name startRideService
 * @description Start a ride after OTP verification
 * @param {Object} params - Ride start details
 * @param {string} params.rideId - Ride ID
 * @param {string} params.otp - OTP
 * @param {Object} params.captain - Captain object
 * @returns {Promise<Object>} - Ride document
 */
async function startRideService({rideId, otp, captain}) {

    if (!rideId || !otp) {
        throw new Error("Ride id and OTP are required");
    }

    const ride = await rideModel
        .findOne({
            _id: rideId,
            captain: captain._id
        })
        .populate("user")
        .populate("captain")
        .select("+otp");

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "accepted") {
        throw new Error("Ride not accepted");
    }

    // Verify OTP
    if (ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    // Start ride
    ride.status = "ongoing";

    await ride.save();

    // Hide OTP before returning
    const rideResponse = ride.toObject();
    delete rideResponse.otp;

    return rideResponse;
}


/**
 * @name endRideService
 * @description End a ride after completion
 * @param {Object} params - Ride end details
 * @param {string} params.rideId - Ride ID
 * @param {Object} params.captain - Captain object
 * @returns {Promise<Object>} - Ride document
 */
async function endRideService({rideId, captain}) {

    if (!rideId) {
        throw new Error("Ride id is required");
    }

    const ride = await rideModel
        .findOne({
            _id: rideId,
            captain: captain._id
        })
        .populate("user")
        .populate("captain");

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "ongoing") {
        throw new Error("Ride not ongoing");
    }

    ride.status = "completed";

    await ride.save();

    return ride;
}


/**
 * @name getCaptainsInRadiusService
 * @description Find captains within a specified radius.
 * @param {number} latitude - Latitude of the center point
 * @param {number} longitude - Longitude of the center point
 * @param {number} radius - Radius in km
 * @returns {Promise<Array>} captains ordered by distance when Redis is used
 */
async function getCaptainsInRadiusService(latitude, longitude, radius) {

    if (typeof latitude !== "number" || typeof longitude !== "number" || typeof radius !== "number") {
        throw new Error("Latitude, longitude, and radius must be numbers");
    }

    // Try Redis GEO first
    const captainIds = await findCaptainIdsInGeoRadius(latitude, longitude, radius);

    //If Redis works
    if (captainIds !== null) {

        if (captainIds.length === 0) {
            return [];
        }

        // Fetch captain documents from MongoDB based on the IDs in captainIds array
        const captains = await captainModel.find({ _id: { $in: captainIds } });

        // create a captain map that contains captain id as key and captain document as value
        const captainMap = new Map( captains.map(captain => [ captain._id.toString(), captain ]) );

        // return the captains in the order of captainIds array, filtering out any undefined captain document (in case some captainIds don't have corresponding documents)
        return captainIds
            .map(id => captainMap.get(id))
            .filter(Boolean);
    }

    // If Redis failed → MongoDB fallback
    // Fetch all captains with valid coordinates (both latitude and longitude exist)
    const captains = await captainModel.find({
        "location.latitude": { $exists: true },
        "location.longitude": { $exists: true }
    });

    return captains.filter(captain => {
        const distance = calculateDistance(latitude, longitude, captain.location.latitude, captain.location.longitude);
        return distance <= radius;
    });
}

// Function to calculate distance between two coordinates using Haversine formula

/**
 * @name calculateDistance
 * @description Calculate the distance between two geographical coordinates using the Haversine formula.  -- a helper function
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns {number} - Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371; // Radius of the Earth in km
    const toRad = ( degree ) => ( degree * Math.PI / 180 ); // Convert degrees to radians
    
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.atan2( Math.sqrt(a), Math.sqrt(1 - a) );
}

export { 
    calculateFareService,
    createRideService, 
    confirmRideService, 
    startRideService,
    endRideService,
    getCaptainsInRadiusService,
};