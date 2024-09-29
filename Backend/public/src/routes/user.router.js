import { userRegister,userLogin } from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJwt } from "../middleware/jwtVerify.middleware.js";

export const userRouter = Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);