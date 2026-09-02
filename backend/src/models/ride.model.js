import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        captain: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'captain',
        },
        pickup: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        fare: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [ 'pending', 'accepted', 'ongoing', 'completed', 'cancelled' ],
            default: 'pending',
        },

        duration: {
            type: Number,
        }, // in minutes

        distance: {
            type: Number,
        }, // in km

        otp: {
            type: String,
            select: false,
            required: true,
        },
    },
    {
        timestamps: true,

        toJSON: {
            virtuals: true,
        },

        toObject: {
            virtuals: true,
        },
    }
);

rideSchema.virtual("payment", {
    ref: "payment",
    localField: "_id",
    foreignField: "ride",
    justOne: true,
});

export default mongoose.model('ride', rideSchema);