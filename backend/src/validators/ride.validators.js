import { body, query } from "express-validator";

/**
 * @name createRideValidator
 * @description Validation rules for creating a ride
 */
const createRideValidator = [
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
];

/**
 * @name getFareValidator
 * @description Validation rules for fetching fare estimate
 */
const getFareValidator = [
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
];

/**
 * @name confirmRideValidator
 * @description Validation rules for confirming a ride
 */
const confirmRideValidator = [
  body("rideId").isMongoId().withMessage("Invalid ride id"),
];

/**
 * @name startRideValidator
 * @description Validation rules for starting a ride
 */
const startRideValidator = [
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  body("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
];

/**
 * @name endRideValidator
 * @description Validation rules for ending a ride
 */
const endRideValidator = [
  body("rideId").isMongoId().withMessage("Invalid ride id"),
];

export {
  createRideValidator,
  getFareValidator,
  confirmRideValidator,
  startRideValidator,
  endRideValidator,
};
