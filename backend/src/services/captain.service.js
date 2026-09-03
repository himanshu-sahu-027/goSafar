import jwt from "jsonwebtoken";

import captainModel from "../models/captain.model.js";

import { verifyGoogleTokenService } from "./googleAuth.service.js";
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

  if (
    !fullname?.firstname ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
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
 * @name googleCaptainSigninService
 * @description Handles Google sign-in for existing captains and creates a short-lived registration token for new captains.
 * @param {string} idToken - Google ID token received from the frontend.
 * @returns {Promise<Object>} Existing captain or registration information.
 */
async function googleCaptainSigninService(idToken) {
  if (!idToken) {
    throw new Error("Google ID token is required");
  }

  // Verify the Google ID token and get trusted account information.
  const googleCaptain = await verifyGoogleTokenService(idToken);

  // Find an existing captain using the stable Google account ID.
  let captain = await captainModel.findOne({
    googleId: googleCaptain.googleId,
  });

  if (captain) {
    return {
      captain,
      registrationRequired: false,
    };
  }

  // Check whether this Google email already belongs to a GoSafar captain.
  captain = await captainModel.findOne({
    email: googleCaptain.email,
  });

  if (captain) {
    // Link the verified Google account to the existing captain.
    captain.googleId = googleCaptain.googleId;

    await captain.save();

    return {
      captain,
      registrationRequired: false,
    };
  }

  // Create a short-lived token containing only verified Google identity information.
  const registrationToken = jwt.sign(
    {
      type: "captain-registration",
      googleId: googleCaptain.googleId,
      email: googleCaptain.email,
      firstname: googleCaptain.firstName,
      lastname: googleCaptain.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    },
  );

  return {
    registrationRequired: true,
    registrationToken,
  };
}

/**
 * @name completeGoogleCaptainRegistrationService
 * @description Completes Google captain registration using a short-lived registration token and vehicle information.
 * @param {string} registrationToken - Short-lived Google captain registration token.
 * @param {Object} vehicle - Captain vehicle details.
 * @returns {Promise<Object>} Newly created captain document.
 */
async function completeGoogleCaptainRegistrationService(
  registrationToken,
  vehicle,
) {
  if (!registrationToken) {
    throw new Error("Registration token is required");
  }

  if (
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
    throw new Error("All vehicle fields are required");
  }

  let payload;

  try {
    // Verify the registration token and its expiration.
    payload = jwt.verify(registrationToken, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired registration token");
  }

  if (payload.type !== "captain-registration") {
    throw new Error("Invalid captain registration token");
  }

  // Prevent duplicate captain creation.
  const existingCaptain = await captainModel.findOne({
    $or: [{ googleId: payload.googleId }, { email: payload.email }],
  });

  if (existingCaptain) {
    throw new Error("Captain already exists");
  }

  // Create the captain using only the verified Google identity from the token.
  const captain = await captainModel.create({
    googleId: payload.googleId,
    fullname: {
      firstname: payload.firstname,
      lastname: payload.lastname,
    },
    email: payload.email,
    vehicle,
  });

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
  googleCaptainSigninService,
  completeGoogleCaptainRegistrationService,
  getCaptainProfileService,
  removeCaptainProfileCache,
  updateCaptainLocationService,
};
