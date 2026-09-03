import userModel from "../models/user.model.js";
import { verifyGoogleTokenService } from "./googleAuth.service.js";
import {
  getCachedUserProfile,
  cacheUserProfile,
  removeUserProfileCache,
} from "./redis/redisProfileCache.service.js";

/**
 * @name createUserService
 * @description Handles full user registration flow: check existing, hash password, create a new user in the database, expects fullname: { firstname, lastname }, email, and password
 * @param {Object} fullname - User's full name { firstname, lastname }
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - The created user document
 */
async function createUserService(fullname, email, password) {
  // Check if user already exists
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    throw new Error("User already exists");
  }

  if (!fullname?.firstname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Hash password
  const hashedPassword = await userModel.hashPassword(password);

  // Create user
  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  return user;
}

/**
 * @name loginUserService
 * @description Authenticate a user by email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Authenticated user document
 */
async function loginUserService(email, password) {
  // Find user and include password field
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}

/**
 * @name googleUserSigninService
 * @description Handles both Google sign-in and Google-based account creation for users.
 * @param {string} idToken - Google ID token received from the frontend.
 * @returns {Promise<Object>} Existing or newly created user document.
 */
async function googleUserSigninService(idToken) {
  if (!idToken) {
    throw new Error("Google ID token is required");
  }

  // Verify the Google ID token and get trusted account information.
  const googleUser = await verifyGoogleTokenService(idToken);

  const email = googleUser.email.toLowerCase();

  // Find the user using the stable Google account ID.
  let user = await userModel.findOne({
    googleId: googleUser.googleId,
  });

  if (user) {
    return user;
  }

  // Check whether this Google email already belongs to a GoSafar user.
  user = await userModel.findOne({ email });

  if (user) {
    // Link the verified Google account to the existing user.
    user.googleId = googleUser.googleId;

    await user.save();

    return user;
  }

  // Create a new GoSafar user using the verified Google information.
  user = await userModel.create({
    googleId: googleUser.googleId,
    fullname: {
      firstname: googleUser.firstName,
      lastname: googleUser.lastName,
    },
    email,
  });

  return user;
}

/**
 * @name getUserProfileService
 * @description Fetch user profile by userId
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - user profile document
 */
async function getUserProfileService(userId) {
  if (!userId) {
    throw new Error("User id is required");
  }

  // Cache hit: Redis first.
  const cachedUser = await getCachedUserProfile(userId);
  if (cachedUser) {
    return cachedUser;
  }

  // Cache miss: MongoDB is the source of truth.
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await cacheUserProfile(user);

  return user;
}

export {
  createUserService,
  loginUserService,
  googleUserSigninService,
  getUserProfileService,
  removeUserProfileCache,
};
