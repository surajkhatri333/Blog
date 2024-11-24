import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js'
import { Admin } from '../models/Admin.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";


export const userRegister = asyncHandler(async (req, res) => {
    // try {
    //     let { name, email, password, role } = req.body;
    //     console.log(req.body);
    //     if (!name || !email || !password) {
    //         return res.status(400).json(new ApiError(400, "Please fill full details"));
    //     }

    //     const existedUser = role === "User"
    //         ? await User.findOne({ email })
    //         : await Admin.findOne({ email })

    //     if (existedUser) {
    //         return res.status(400).json(new ApiError(400, " User already exit"));
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 8);

    //     let user;
    //     if (role == "User") {
    //          user = await User.create({
    //             username: name,
    //             email,
    //             password: hashedPassword,
    //             role
    //         });
    //     }
    //     else if (role == "Admin") {
    //          user = await Admin.create({
    //             username: name,
    //             email,
    //             password: hashedPassword,
    //             role
    //         });
    //     }


    //     const userCreated =  role === "User"
    //     ? await User.findOne({ email })
    //     : await Admin.findOne({ email });

    //     if (!userCreated) {
    //         return res.status(500).json(new ApiError(500, "Something went wrong while registering"));
    //     }

    //     console.log(userCreated)

    //     return res.status(200).json(
    //         new ApiResponse(200, user, "User suceessfully register")
    //     )

    // }
    try {
        let { profileAvatar, name, email, password, role } = req.body;
        console.log(req.body)

        if (!profileAvatar || !name || !email || !password) {
            return res.status(400).json(new ApiError(400, "Please fill all required details"));
        }

        if (role !== "User" && role !== "Admin") {
            return res.status(400).json(new ApiError(400, "Invalid role specified"));
        }

        const userExists = role === "User"
            ? await User.findOne({ email })
            : await Admin.findOne({ email });


        if (userExists) {
            return res.status(400).json(new ApiError(400, `${role} with this email already exists`));
        }

        const hashedPassword = await bcrypt.hash(password, 8);

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


        if (!userCreated) {
            return res.status(500).json(new ApiError(500, "Something went wrong while registering"));
        }

        console.log(userCreated);

        return res.status(200).json(
            new ApiResponse(200, user, `${role} successfully registered`)
        );
    }
    catch (err) {
        console.log("user can not register")
        return res.status(400).json({ message: "user not register" })
    }

});


export const userLogin = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json(new ApiError(400, "Something went wrong while login user"));
        }

        const userExist =
            await User.findOne({ $or: [{ email: email }, { username: email }] }) || await Admin.findOne({ $or: [{ email: email }, { username: email }] });
        console.log(userExist);

        if (!userExist) {
            return res.status(400).json(new ApiError(400, "Invalid user"));
        }

        const checkPassword =  bcrypt.compare(password, userExist.password);

        if (!checkPassword) {
            console.log("Invalid password");
            return res.status(400).json(new ApiError(400, "Wrong password"));
        }


        console.log("password is :", checkPassword);

        //generate access token
        const token = jwt.sign(
            { id: userExist._id, isAdmin: userExist.isAdmin },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
        );

        //set cookies
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000,
            secure: false,
            samesite: "Lax",
            path:"/"
        })

        console.log("user login successfully");
        console.log(token)

        return res.status(200).json({message: "you are successfuly login", token});

    }
    catch(err){
        console.log("server error while login user")
    }

});

export const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    return res.status(200).json({ message: "Logged out successfully" });
    // res.cookie("token", "", {
    //     httpOnly: true,
    //     expires: new Date(0)
    // })

    // return res.status(200).json(new ApiResponse(200, "User successfully logout"))
})