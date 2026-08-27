import captainModel from "../models/captain.model.js";
import {
  getCachedCaptainProfile,
  cacheCaptainProfile,
  removeCaptainProfileCache,
} from "./redis/redisProfileCache.service.js";

/**
 * @name createCaptainService
 * @description Handles full captain registration flow: check existing, hash password, create a new captain in the database, expects fullname: { firstname, lastname }, email, password and vehicle : { color, plate, capacity, vehicleType } 
 * @param {Object} fullname - Captain's full name { firstname, lastname }
 * @param {string} email - Captain's email
 * @param {string} password - Captain's password
 * @param {Object} vehicle - Captain's vehicle details { color, plate, capacity, vehicleType } 
 * @returns {Promise<Object>} - Created captain document
 */
async function createCaptainService({ fullname, email, password, vehicle }) {
 
  // Check if captain already exists
  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    throw new Error("Captain already exists");
  }

  if (!fullname?.firstname || !email || !password || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
    throw new Error("All fields are required");
  }

  // Hash password
  const hashedPassword = await captainModel.hashPassword(password);

  // Create captain directly with nested fullname and vehicle
  const captain = await captainModel.create({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  return captain;
}

/**
 * @name loginCaptainService
 * @description Authenticate captain by email and password
 * @param {string} email - Captain's email
 * @param {string} password - Captain's password
 * @returns {Promise<Object>} - Authenticated captain document
 */
async function loginCaptainService(email, password) {
  
    // Find captain and include password field
    const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return captain;
}

/**
 * @name getCaptainProfileService
 * @description Fetch captain profile by captainId
 * @param {string} captainId - Captain ID
 * @returns {Promise<Object>} - captain profile document
 */
async function getCaptainProfileService(captainId) {
  if (!captainId) {
    throw new Error("Captain id is required");
  }

  // Cache hit: Redis first.
  const cachedCaptain = await getCachedCaptainProfile(captainId);
  if (cachedCaptain) {
    return cachedCaptain;
  }

  // Cache miss: MongoDB is the source of truth.
  const captain = await captainModel.findById(captainId);

  if (!captain) {
    throw new Error("Captain not found");
  }

  await cacheCaptainProfile(captain);

  return captain;
}

/**
 * @name updateCaptainLocationService
 * @description Update captain's live location in MongoDB
 * @param {string} captainId - Captain ID
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} - Updated captain document
 */
async function updateCaptainLocationService(captainId, latitude, longitude) {
    
  if (!captainId) {
        throw new Error("Captain id is required");
    }

    const captain = await captainModel.findById(captainId);

    if (!captain) {
        throw new Error("Captain not found");
    }

    captain.location = {
        latitude,
        longitude,
    };

    captain.locationUpdatedAt = new Date();

    await captain.save();

    return captain;
}

export {
  createCaptainService,
  loginCaptainService,
  getCaptainProfileService,
  removeCaptainProfileCache,
  updateCaptainLocationService,
};
