import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/Admin.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken'
export const adminLogin = asyncHandler(async (req, res) => {
    console.log("login request comes")
    try {
        const { email, password, isAdmin } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and password are required"));
        }
        console.log("error 1")

        const userExist = await Admin.findOne({ $or: [{ email }, { username: email }] });

        console.log("error 2")
        if (!userExist) {
            return res.status(400).json(new ApiError(400, "Invalid email or username"));
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(400).json(new ApiError(400, "Incorrect password"));
        }
        console.log("error 3")
        console.log("error 4")

        const token = jwt.sign(
            { id: userExist._id, isAdmin: userExist.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        console.log("error 5")
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: false,
            sameSite: "Lax",
            path: "/"
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login failed:", err);
        return res.status(500).json(new ApiError(500, "Server error while logging in"));
    }
});



export const userLogout = asyncHandler(async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in production
            sameSite: "Lax",
            path: "/"
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Logout failed:", err);
        return res.status(500).json(new ApiError(500, "Server error during logout"));
    }
});
