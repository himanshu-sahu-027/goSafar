import {
    calculateFareService,
    createRideService,
    confirmRideService,
    startRideService,
    endRideService,
    getCaptainsInRadiusService,
} from "../services/ride.service.js";

import { getAddressCoordinateService } from "../services/map.service.js";

import {
    sendMessageToCaptain,
    sendMessageToUser,
} from "../socket.js";

import rideModel from "../models/ride.model.js";

// Remove OTP from ride
function sanitizeRideForCaptain(ride) {
    if (!ride) return ride;

    const rideResponse = ride.toObject ? ride.toObject() : { ...ride }; 
    delete rideResponse.otp;

    return rideResponse;
}

/**
 * @name createRideController
 * @description Controller to create a new ride request by a user and notify nearby captains via socket.
 * @route POST /rides/createRide
 * @access Private (User)
 */
async function createRideController(req, res) {
    try {
        const { pickup, destination, vehicleType } = req.body;

        const ride = await createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType,
        });

        console.log("[Ride] Ride created successfully:", {
            rideId: ride._id,
            pickup: ride.pickup,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            fare: ride.fare,
            status: ride.status,
        });

        const userResponse = {
            _id: ride._id,
            pickup: ride.pickup,
            destination: ride.destination,
            fare: ride.fare,
            status: ride.status,
            otp: ride.otp,
        };
        res.status(201).json(userResponse);

        console.log("[Ride] Getting pickup coordinates:", pickup);

        // Get pickup coordinates
        const pickupCoordinates = await getAddressCoordinateService(pickup);

        console.log("[Ride] Pickup coordinates received:", {
                latitude: pickupCoordinates.latitude,
                longitude: pickupCoordinates.longitude,
            });

        console.log("[Ride] Searching nearby captains:", {
                latitude: pickupCoordinates.latitude,
                longitude: pickupCoordinates.longitude,
                radius: "10 km",
            });

        // Find captains within radius ( 10 km radius)
        const captainsInRadius = await getCaptainsInRadiusService(
                pickupCoordinates.latitude,
                pickupCoordinates.longitude,
                10
            );

        console.log("[Ride] Nearby captains found:", {
                count: captainsInRadius.length,
                captains: captainsInRadius.map((captain) => ({
                        captainId: captain._id,
                        socketId: captain.socketId,
                    })),
            });

        // Populate user details for broadcasting. Captains need to know who requested the ride.
        const rideWithUserDetails = await rideModel
            .findOne({ _id: ride._id })
            .populate("user");

        console.log("[Ride] Ride details prepared for captains:", {
                rideId: rideWithUserDetails._id,
                userId: rideWithUserDetails.user?._id,
            });

        // Hide the otp from the ride details sent to captains.
        const rideDetailsForCaptain = {
            _id: rideWithUserDetails._id,
            user: rideWithUserDetails.user,
            pickup: rideWithUserDetails.pickup,
            destination: rideWithUserDetails.destination,
            distance: ride.distance,
            duration: ride.duration,
            fare: rideWithUserDetails.fare,
            status: rideWithUserDetails.status,
        };

        // Notify each captain via socket
        captainsInRadius.forEach((captain) => {
            console.log("[Socket] Sending new ride to captain:", {
                    captainId: captain._id,
                    socketId: captain.socketId,
                    event: "createNewRide",
                    rideId: ride._id,
                });

            sendMessageToCaptain(captain._id, {
                event: "createNewRide",
                data: rideDetailsForCaptain,
            });

            console.log("[Socket] Ride request emitted:", {
                    captainId: captain._id,
                    socketId: captain.socketId,
                });
        });
    } catch (err) {
        console.error("Create ride error:", err);

        if (!res.headersSent) {
            return res.status(500).json({
                message: err.message,
            });
        }
    }
}

/**
 * @name getFareController
 * @description Controller to calculate fare estimate.
 * @route GET /rides/getFare
 * @access Private (User)
 */
async function getFareController(req, res) {
    try {
      const { pickup, destination } = req.query;
      const fare = await calculateFareService(pickup, destination);

      return res.status(200).json(fare);
    } catch (err) {
        console.error("Get fare error:", err);

        return res.status(500).json({ message: err.message });
    }
}

/**
 * @name confirmRideController
 * @description Controller for captain to confirm a ride.
 * @route POST /rides/confirmRide
 * @access Private (Captain)
 */
async function confirmRideController(req, res) {
    try {
        const { rideId } = req.body;
        const ride = await confirmRideService({ rideId, captain: req.captain });

        // Notify user via socket that the ride has been confirmed
        sendMessageToUser(ride.user.socketId, {
          event: "rideConfirmed",
          data: ride,
        });

        return res.status(200).json(sanitizeRideForCaptain(ride));
    } catch (err) {
        console.error("Confirm ride error:", err);
        return res.status(500).json({ message: err.message });
    }
}

/**
 * @name startRideController
 * @description Controller to start a ride after OTP verification.
 * @route POST /rides/startRide
 * @access Private (Captain)
 */
async function startRideController(req, res) {
    try {
      const { rideId, otp } = req.body;
      const ride = await startRideService({ rideId, otp, captain: req.captain });

      // Notify user that ride has started.
      sendMessageToUser(ride.user.socketId, {
        event: "rideStarted",
        data: ride,
      });

      return res.status(200).json(sanitizeRideForCaptain(ride));
    } catch (err) {
      console.error("Start ride error:", err);
      return res.status(500).json({ message: err.message });
    }
}

/**
 * @name endRideController
 * @description Controller to end a ride.
 * @route POST /rides/endRide
 * @access Private (Captain)
 */
async function endRideController(req, res) {
    try {
        const { rideId } = req.body;
        const ride = await endRideService({ rideId, captain: req.captain });

        // Notify user that the ride has ended.
        sendMessageToUser(ride.user.socketId, {
          event: "rideEnded",
          data: ride,
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("End ride error:", err);
        return res.status(500).json({ message: err.message });
    }
}

export {
    createRideController,
    getFareController,
    confirmRideController,
    startRideController,
    endRideController,
};