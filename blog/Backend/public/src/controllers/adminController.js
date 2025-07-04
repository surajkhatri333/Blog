import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Admin login
export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
        return res.status(400).json(new ApiError(400, "Email and password are required"));
    }

    const userExist = await Admin.findOne({ $or: [{ email }, { username: email }] });

    if (!userExist) {
        return res.status(400).json(new ApiError(400, "Invalid email or username"));
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
        return res.status(400).json(new ApiError(400, "Incorrect password"));
    }

    const token = jwt.sign(
        { id: userExist._id, isAdmin: userExist.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "production",  // true only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
    });

    return res.status(200).json({ message: "Login successful", token });
});

// Logout
export const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        path: "/",
    });

    return res.status(200).json({ message: "Logout successful" });
});

// Check login status
export const checkAdminAuth = asyncHandler(async (req, res) => {
    return res.status(200).json({ isLogin: true, user: req.user });
});


