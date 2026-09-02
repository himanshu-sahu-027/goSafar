import { body } from "express-validator";

/**
 * @name createPaymentOrderValidator
 * @description Validation rules for creating a payment order
 */
const createPaymentOrderValidator = [
  body("rideId").isMongoId().withMessage("Invalid ride id"),
];

/**
 * @name verifyPaymentValidator
 * @description Validation rules for verifying a payment
 */
const verifyPaymentValidator = [
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  body("orderId")
    .isString()
    .notEmpty()
    .withMessage("Invalid order id"),
  body("paymentId")
    .isString()
    .notEmpty()
    .withMessage("Invalid payment id"),
  body("signature")
    .isString()
    .notEmpty()
    .withMessage("Invalid signature"),
];

export {
  createPaymentOrderValidator,
  verifyPaymentValidator,
};