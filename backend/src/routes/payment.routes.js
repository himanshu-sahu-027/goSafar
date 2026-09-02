import express from "express";

import {
    createPaymentOrderValidator,
    verifyPaymentValidator,
} from "../validators/payment.validators.js";

import validateRequest from "../middlewares/validationError.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

import {
    createPaymentOrderController,
    verifyPaymentController,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

/**
 * @route POST /payments/create-order
 * @description Create a Razorpay payment order for a completed ride.
 * @access Private (User)
 */
paymentRouter.post("/createPaymentOrder", createPaymentOrderValidator, validateRequest, authUser, createPaymentOrderController);

/**
 * @route POST /payments/verify
 * @description Verify a Razorpay payment for a completed ride.
 * @access Private (User)
 */
paymentRouter.post("/verifyPayment", verifyPaymentValidator, validateRequest, authUser, verifyPaymentController);

export default paymentRouter;