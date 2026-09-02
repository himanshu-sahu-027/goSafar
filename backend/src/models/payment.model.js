import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        ride: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ride',
            required: true,
            unique: true,   // One ride can have only one Payment document.
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
        },

        razorpayOrderId: {
            type: String,
            required: true,
        },

        razorpayPaymentId: {
            type: String,
        },

        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('payment', paymentSchema);