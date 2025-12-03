import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expiry: 300
    }
});

export const OTP = mongoose.model("OTP", otpSchema);