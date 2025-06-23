import { userRegister,userLogin, userLogout } from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJwt } from "../middleware/jwtVerify.middleware.js";

export const userRouter = Router();

userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);
userRouter.post("/logout",userLogout)