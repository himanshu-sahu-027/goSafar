import rideModel from "../models/ride.model.js";
import paymentModel from "../models/payment.model.js";

import {
    createRazorpayOrderService,
    fetchRazorpayPaymentService,
    verifyRazorpaySignatureService,
} from "./razorpay.service.js";

import { envConfig } from "../config/env.js";

/**
 * @name createPaymentOrderService
 * @description Create a Razorpay payment order for a completed ride.
 * @param {Object} params - Payment order details.
 * @param {string} params.rideId - Ride ID for which payment is being created.
 * @param {Object} params.user - Authenticated user object.
 * @returns {Promise<Object>} Razorpay order details required by the frontend.
 */
async function createPaymentOrderService({ rideId, user }) {

    if (!rideId || !user) {
        throw new Error("Ride id and user are required");
    }

    // Find the ride and make sure it belongs to the authenticated user.
    const ride = await rideModel.findOne({
        _id: rideId,
        user: user._id,
    });

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "completed") {
        throw new Error("Ride is not completed yet");
    }

    // Check whether a payment already exists for this ride.
    const existingPayment = await paymentModel.findOne({
        ride: ride._id,
    });

    // If the ride already has a paid payment, do not create another one.
    if (existingPayment?.status === "paid") {
        throw new Error("Ride already paid");
    }

    // If a pending payment already exists, return the existing Razorpay order instead of creating another order for the same ride.
    if (existingPayment && existingPayment.status === "pending" && existingPayment.razorpayOrderId) {
        return {
            orderId: existingPayment.razorpayOrderId,
            amount: Math.round(Number(existingPayment.amount) * 100),
            currency: "INR",
            key: envConfig.RAZORPAY_KEY_ID,
        };
    }

    // Ride fare is the source of truth for the payment amount.
    const amount = Number(ride.fare);

    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid ride fare");
    }

    // Razorpay expects amount in the smallest currency unit.
    // For INR, ₹1 = 100 paise.
    const razorpayAmount = Math.round(amount * 100);

    // Create order through the Razorpay service.
    const order = await createRazorpayOrderService({
        amount: razorpayAmount,
        currency: "INR",
        receipt: `ride_${ride._id.toString()}`,
    });

    // Create or update the payment document.
    if (existingPayment) {

        existingPayment.user = user._id;
        existingPayment.amount = amount;
        existingPayment.status = "pending";
        existingPayment.razorpayOrderId = order.id;
        existingPayment.razorpayPaymentId = undefined;
        existingPayment.paidAt = undefined;

        await existingPayment.save();

    } else {

        await paymentModel.create({
            ride: ride._id,
            user: user._id,
            amount,
            status: "pending",
            razorpayOrderId: order.id,
        });
    }

    return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: envConfig.RAZORPAY_KEY_ID,
    };
}

/**
 * @name verifyPaymentService
 * @description Verify a Razorpay payment and mark the associated payment as paid after validating the ride, order, signature, payment details, and payment amount.
 * @param {Object} params - Payment verification details.
 * @param {string} params.rideId - Ride ID associated with the payment.
 * @param {Object} params.user - Authenticated user object.
 * @param {string} params.orderId - Razorpay order ID.
 * @param {string} params.paymentId - Razorpay payment ID.
 * @param {string} params.signature - Razorpay payment signature.
 * @returns {Promise<Object>} Verified payment details.
 */
async function verifyPaymentService({rideId, user, orderId, paymentId, signature}) {

    if (!rideId || !orderId || !paymentId || !signature) {
        throw new Error("Payment details are incomplete");
    }

    // Find the ride and verify ownership.
    const ride = await rideModel.findOne({
        _id: rideId,
        user: user._id,
    });

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "completed") {
        throw new Error("Ride is not completed");
    }

    // Find the payment associated with this ride.
    const paymentRecord = await paymentModel.findOne({
        ride: ride._id,
        user: user._id,
    });

    if (!paymentRecord) {
        throw new Error("Payment record not found");
    }

    if (paymentRecord.status === "paid") {
        throw new Error("Ride already paid");
    }

    // Make sure the Razorpay order belongs to our payment record.
    if (paymentRecord.razorpayOrderId !== orderId) {
        throw new Error("Invalid payment order");
    }

    // Verify the signature using the Razorpay service.
    const isSignatureValid = verifyRazorpaySignatureService({orderId, paymentId, signature});

    if (!isSignatureValid) {
        throw new Error("Invalid payment signature");
    }

    // Fetch payment details directly from Razorpay.
    const payment = await fetchRazorpayPaymentService(paymentId).catch( () => null );

    if (!payment || payment.order_id !== orderId) {
        throw new Error("Invalid payment response");
    }

    // Verify that the amount paid matches the ride fare.
    const expectedAmount = Math.round( Number(ride.fare) * 100 );

    if (Number(payment.amount) !== expectedAmount) {
        throw new Error("Payment amount mismatch");
    }

    // Mark the payment as paid.
    paymentRecord.status = "paid";
    paymentRecord.razorpayPaymentId = paymentId;
    paymentRecord.paidAt = new Date();

    await paymentRecord.save();

    return {
        rideId: ride._id,
        paymentStatus: paymentRecord.status,
        amount: paymentRecord.amount,
        paymentId: paymentRecord.razorpayPaymentId,
    };
}

export {
    createPaymentOrderService,
    verifyPaymentService,
};