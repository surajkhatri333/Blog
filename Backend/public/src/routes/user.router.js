import { userRegister,userLogin } from "../controllers/user.controller.js";
import { Router } from "express";


export const userRouter = Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);