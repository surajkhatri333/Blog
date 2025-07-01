import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js'
import { Admin } from '../models/Admin.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";


export const userRegister = asyncHandler(async (req, res) => {
    
    try {
        let { profileAvatar, name, email, password, role } = req.body;
        console.log(req.body)

        if (!profileAvatar || !name || !email || !password) {
            return res.status(400).json(new ApiError(400, "Please fill all required details"));
        }
        console.log("error 1")

        if (role !== "User" && role !== "Admin") {
            return res.status(400).json(new ApiError(400, "Invalid role specified"));
        }
        console.log("error 2")

        const userExists = role === "User"
            ? await User.findOne({ email })
            : await Admin.findOne({ email });

        console.log("error 3")
        if (userExists) {
            return res.status(400).json(new ApiError(400, `${role} with this email already exists`));
        }
        console.log("error 3")

        const hashedPassword = await bcrypt.hash(password, 8);
        console.log("error 4")
        let user;
        if (role === "User") {
            user = await User.create({
                profileAvatar,
                username: name,
                email,
                password: hashedPassword,
                role
            });
        } else {
            user = await Admin.create({
                profileAvatar,
                username: name,
                email,
                password: hashedPassword,
                role
            });
        }

        const userCreated = role === "User"
            ? await User.findOne({ email: user.email })
            : await Admin.findOne({ email: user.email });
        console.log("error 5")

        if (!userCreated) {
            return res.status(500).json(new ApiError(500, "Something went wrong while registering"));
        }

        // console.log(userCreated);
        console.log("error 6")
        return res.status(200).json(
            new ApiResponse(200, user, `${role} successfully registered`)
        );
    }
    catch (err) {
        console.log("user can not register",err.message)
        return res.status(400).json({ message: "user not register" })
    }

});


export const userLogin = async (req, res) => {
    console.log("login request comes")
    try {
        const { email, password, isAdmin } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Email and password are required"));
        }
        console.log("error 1")
        let userExist;
        if (isAdmin) {
            userExist = await Admin.findOne({ $or: [{ email }, { username: email }] });
        } else {
            userExist = await User.findOne({ $or: [{ email }, { username: email }] });
        }
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
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("error 5")
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: true,
            sameSite: "Lax",
            path: "/"
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login failed:", err);
        return res.status(500).json(new ApiError(500, "Server error while logging in"));
    }
};



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
