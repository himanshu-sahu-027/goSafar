import {
  createUserService,
  loginUserService,
} from "../services/user.service.js";

import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

/**
 * @name registerUserController
 * @description Register a new user
 * @route POST /users/register
 * @access Public
 */
async function registerUserController(req, res, next) {
  try {
    const { fullname, email, password } = req.body;

    // Delegate full registration flow to service
    const createdUser = await createUserService(fullname, email, password);

    // Generate token
    const token = createdUser.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * @name loginUserController
 * @description Login a user
 * @route POST /users/login
 * @access Public
 */
async function loginUserController(req, res, next) {
  try {
    const { email, password } = req.body;

    // Delegate authentication to service
    const user = await loginUserService(email, password);

    // Generate token
    const token = user.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(200).json({
      message: "User loggeded successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

/**
 * @name getUserProfileController
 * @description Get profile of the authenticated user
 * @route GET /users/profile
 * @access Private
 */
async function getUserProfileController(req, res, next) {
  res.status(200).json(req.user);
}


/**
 * @name logoutUserController
 * @description Logout a user by blacklisting its token and clearing the cookie
 * @route POST /users/logout
 * @access Private
 */
async function logoutUserController(req, res) {
  try {
    // Get token from cookie or header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Blacklist the token
    await tokenBlacklistModel.create({ token });

    // Clear cookie after blacklisting
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
}

export {
  registerUserController,
  loginUserController,
  getUserProfileController,
  logoutUserController,
};
