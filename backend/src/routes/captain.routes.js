import express from "express";

import {
    registerCaptainController,
    loginCaptainController,
    getCaptainProfileController,
    getCaptainRideHistoryController,
    logoutCaptainController
} from "../controllers/captain.controller.js";

import {
    authCaptain
} from "../middlewares/auth.middleware.js";

import {
    registerCaptainValidation,
    loginCaptainValidation,
} from "../validators/captain.validators.js";

import validateRequest from "../middlewares/validationError.middleware.js";

const captainRouter = express.Router();

/**
 * @route POST /captains/register
 * @description Register a new captain
 * @access public
 */
captainRouter.post("/register", registerCaptainValidation, validateRequest, registerCaptainController);

/**
 * @route POST /captains/login
 * @description Login a captain
 * @access public
 */
captainRouter.post("/login", loginCaptainValidation, validateRequest, loginCaptainController);

/**
 * @route GET /captains/profile
 * @description Get the profile of the authenticated captain
 * @access private
 */
captainRouter.get("/profile", authCaptain, getCaptainProfileController);

/**
 * @route GET /captains/history
 * @description Get authenticated captain ride history
 * @access private
 */
captainRouter.get("/history", authCaptain, getCaptainRideHistoryController);
 
/**
 * @route POST /captains/logout
 * @description Logout a captain by blacklisting its token and clearing the cookie
 * @access private
 */
captainRouter.post("/logout", authCaptain, logoutCaptainController);

export default captainRouter;