
import User from "../models/UserModel.js"
export const CurrentUserr = async(req,res)=>{
    try {
        const UserId = req.userId;
        console.log(UserId);
        const user = await User.findById(UserId);
        if(!user){
            res.json({success:"false",message:"user Not found"});
        }
        return  res.json({success:"true",user});
    } catch (error) {
        console.log(error);
         res.json({success:"false",message:"server error"});
    }
}