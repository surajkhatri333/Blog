import React from 'react'
import generateOtp from '../utils/generateOtp.js';
import nodemailer from "nodemailer";
import { OTP } from '../models/Otp.model.js';

export  async function sendOtp(req,res) {
    const {email} = req.body;

    const otp = generateOtp();
    await OTP.create({email, otp : otp});

    const tranporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL,
            pass : process.env.NODEMAILER_PASS
        }

    });
    const mailOption = {
        from : process.env.EMAIL,
        to : email,
        subject : "Your OTP Code",
        text : `Your verification code is ${otp}`
    };

    await tranporter.sendMail(mailOption);

    res.status(200).json({message : "OTP sent successfully"});

}

export async function verifyOtp(req,res) {
    const {email,otp} = req.body;
    console.log(req.body)
    const checkOTP = await OTP.findOne({email}).sort({createdAt : -1});
    console.log(`OTP IS ${otp} , checkOTP is : ${checkOTP}`)
    if(!checkOTP){
        return res.status(400).json({message:"OTP not found"});
    }
    if(checkOTP.otp !== otp){
        return res.status(400).json({message: "Invalid OTP"});
    }

    await OTP.deleteMany({ email});
    return res.status(200).json({message:"OTP Verified successfully"});
}
