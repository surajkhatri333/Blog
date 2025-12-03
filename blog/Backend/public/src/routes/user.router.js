import { userRegister,userLogin, userLogout } from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/jwtVerify.middleware.js";

export const userRouter = Router();

userRouter.post("/register",upload.single("profileAvatar"),userRegister);
userRouter.post("/login",userLogin);
userRouter.post("/logout",userLogout);
userRouter.get("/getcookie",verifyJwt,( req,res) => {
    res.status(200).json({message : "Cookie is present"});
});