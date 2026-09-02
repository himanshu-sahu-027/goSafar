import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { envConfig } from "../config/env.js";

/**
 * Creates an order on Razorpay for a payment transaction.
 *
 * @param {Object} data
 * @param {number} data.amount - Amount in the smallest currency unit (paise for INR).
 * @param {string} [data.currency="INR"] - Currency used for the Razorpay order.
 * @param {string} data.receipt - Internal reference for the payment order.
 * @returns {Promise<Object>} Razorpay order object.
 */
async function createRazorpayOrderService({ amount, currency = "INR", receipt }) {
    return await razorpay.orders.create({
        amount,
        currency,
        receipt,
    });
}

/**
 * Fetches payment details from Razorpay using the Razorpay payment ID.
 *
 * @param {string} paymentId - Razorpay payment ID.
 * @returns {Promise<Object>} Razorpay payment object.
 */
async function fetchRazorpayPaymentService(paymentId) {
    return await razorpay.payments.fetch(paymentId);
}

/**
 * Verifies the Razorpay payment signature.
 *
 * The signature is generated using HMAC-SHA256 from the Razorpay order ID
 * and payment ID, using the Razorpay key secret as the signing key.
 *
 * @param {string} data.orderId - Razorpay order ID.
 * @param {string} data.paymentId - Razorpay payment ID.
 * @param {string} data.signature - Signature received from Razorpay Checkout.
 * @returns {boolean} True when the signature is valid, otherwise false.
 */
function verifyRazorpaySignatureService({ orderId, paymentId, signature }) {
    const generatedSignature = crypto
        .createHmac("sha256", envConfig.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    const expected = Buffer.from(generatedSignature);
    const received = Buffer.from(signature);

    if (expected.length !== received.length) {
        return false;
    }

    return crypto.timingSafeEqual(expected, received);
}

export {
    createRazorpayOrderService,
    fetchRazorpayPaymentService,
    verifyRazorpaySignatureService,
};