import express from "express";

import {
  createRideValidator,
  getFareValidator,
  confirmRideValidator,
  startRideValidator,
  endRideValidator,
} from "../validators/ride.validators.js";

import validateRequest from "../middlewares/validationError.middleware.js";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";

import {
  createRideController,
  getFareController,
  confirmRideController,
  startRideController,
  endRideController
} from "../controllers/ride.controller.js";


const rideRouter = express.Router();

/**
 * @route POST /ride/createRide
 * @description Create a new ride request by a user
 * @access Private (User)
 */
rideRouter.post("/createRide", createRideValidator, validateRequest, authUser, createRideController);

/**
 * @route GET /ride/getFare
 * @description Get fare estimate for a ride
 * @access Private (User)
 */
rideRouter.get("/getFare", getFareValidator, validateRequest, authUser, getFareController);

/**
 * @route POST /ride/confirmRide
 * @description Confirm a ride by captain
 * @access Private (Captain)
 */
rideRouter.post("/confirmRide",  confirmRideValidator, validateRequest, authCaptain, confirmRideController);

/**
 * @route GET /ride/startRide
 * @description Start a ride with OTP verification
 * @access Private (Captain)
 */
rideRouter.post("/startRide",  startRideValidator, validateRequest, authCaptain, startRideController);

/**
 * @route POST /ride/endRide
 * @description End a ride
 * @access Private (Captain)
 */
rideRouter.post("/endRide",  endRideValidator, validateRequest, authCaptain, endRideController);

export default rideRouter;
