import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const userManage = asyncHandler(async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message :"User id is not found"});
        }
       user.ban = !user.ban
       await user.save();
       return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({message :"Server Eroors"})
    }
})