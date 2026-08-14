import {
  createCaptainService,
  loginCaptainService,
} from "../services/captain.service.js";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

/**
 * @name registerCaptainController
 * @description Register a new captain
 * @route POST /captains/register
 * @access Public
 */
async function registerCaptainController(req, res) {
  try {
    const { fullname, email, password, vehicle } = req.body;

    // Delegate full registration flow to service
    const captain = await createCaptainService({ fullname, email, password, vehicle });

    // Generate token
    const token = captain.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(201).json({ 
        message: "Captain registered successfully", 
        captain,
        token 
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * @name loginCaptainController
 * @description Login a captain
 * @route POST /captains/login
 * @access Public
 */
async function loginCaptainController(req, res) {
  try {
    const { email, password } = req.body;

   // Delegate authentication to service
    const captain = await loginCaptainService(email, password);

    // Generate token
    const token = captain.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(200).json({ 
        message: " Captain logged in successful", 
        captain, 
        token 
    });

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

/**
 * @name getCaptainProfileController
 * @description Get profile of the authenticated captain 
 * @route GET /captains/profile
 * @access Private
 */
async function getCaptainProfileController(req, res) {
  res.status(200).json(req.captain);
}

/**
 * @name logoutCaptainController
 * @description Logout a captain by blacklisting its token and clearing the cookie
 * @route GET /captains/logout
 * @access Private
 */
async function logoutCaptainController(req, res) {
  try {
    // Get token from cookie or header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Blacklist the token 
    await tokenBlacklistModel.create({ token });

    // Clear cookie 
    res.clearCookie("token");

    res.status(200).json({ message: "Captain logged out successfully" });

  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
}

export { 
    registerCaptainController,
    loginCaptainController, 
    getCaptainProfileController,
    logoutCaptainController
};
