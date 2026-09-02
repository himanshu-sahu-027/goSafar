import {
    createPaymentOrderService,
    verifyPaymentService,
} from "../services/payment.service.js";

/**
 * @name createPaymentOrderController
 * @description Controller to create a Razorpay payment order for a completed ride.
 * @route POST /payments/create-order
 * @access Private (User)
 */
async function createPaymentOrderController(req, res) {
    try {

        const { rideId } = req.body;
        const response = await createPaymentOrderService({ rideId, user: req.user });

        return res.status(200).json(response);
    } catch (err) {
        console.error("Create payment order error:", err);

        return res.status(400).json({
            message: err.message || "Unable to create payment order",
        });
    }
}

/**
 * @name verifyPaymentController
 * @description Controller to verify a Razorpay payment for a completed ride.
 * @route POST /payments/verify
 * @access Private (User)
 */
async function verifyPaymentController(req, res) {
    try {

        const { rideId, orderId, paymentId, signature } = req.body;
        const response = await verifyPaymentService({ rideId, user: req.user, orderId, paymentId, signature });

        return res.status(200).json({
            message: "Payment verified successfully",
            payment: response,
        });

    } catch (err) {
        console.error("Verify payment error:", err);

        return res.status(400).json({
            message: err.message || "Invalid payment verification",
        });
    }
}

export {
    createPaymentOrderController,
    verifyPaymentController,
};