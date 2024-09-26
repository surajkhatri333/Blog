import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";


export const userRegister = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
        return res.status(400).json(new ApiError(400, "Please fill full details"));
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        return res.status(400).json(new ApiError(400, " User already exit"));
    }



    const user = await User.create({
        username: name,
        email,
        password: await bcrypt.hash("password", 8)
    });

    const userCreated = await User.findOne({ email: user.email });

    if (!userCreated) {
        return res.status(500).json(new ApiError(500, "Something went wrong whil registering"));
    }


    return res.status(200).json(
        new ApiResponse(200, user, "User suceessfully register")
    )

});


export const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(400).json(new ApiError(400, "Something went wrong while login user"));
    }

    const userExist = await User.findOne({ $or: [{ email: email }, { username: email }] });
    console.log(userExist);

    if (!userExist) {
        return res.status(400).json(new ApiError(400, "Invalid user"));
    }

    bcrypt.compare("password", userExist.password)
        .then((checkPassword) => {
            if (!checkPassword) {
                console.log("Invalid password");
                return res.status(400).json(new ApiError(400, "Wrong password"));
            }


            console.log(`password is :`, checkPassword);

            //generate access token
            const token = jwt.sign(
                { id: userExist._id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            //set cookies
            res.cookie("token",token,{
                httpOnly : true,
                maxAge : 3600000,
                secure:true,
                samesite : "strict"
            })

            console.log("user login successfully");
            return res.status(200).json(new ApiResponse(200, "you are successfuly login"));
        })
        .catch(err => {
            console.log(`Error comparing password :`, err)
        })


});

export const userLogout = asyncHandler(async (req,res)=>{
    res.cookie("token","",{
        httpOnly : true,
        expires : new Date(0)
    })

    return res.status(200).json(new ApiResponse(200,"User successfully logout"))
})