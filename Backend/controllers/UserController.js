import { GenToken } from "../config/Gentoken.js";
import User  from "../models/UserModel.js"
import bcrypt from "bcryptjs"
export const SignUp = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
          return   res.json({success:false,message:"someThing is missing"});
        }
        const user = await User.findOne({email});
        if(user){
             return   res.json({success:false,message:"Email already exists"});
        }
       const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password:hashPassword
        })

        const token =await GenToken(newUser._id);
        res.cookie("token", token, {
    httpOnly: true,           
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    sameSite: "strict",       
    secure: false             
});



        if(newUser){
            return   res.json({success:true,newUser});
        }

    } catch (error) {
        console.log(error);
        return   res.json({success:false,message:"Server error"});
    }
}





export const Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if( !email || !password){
          return   res.json({success:false,message:"someThing is missing"});
        }
        const user = await User.findOne({email});
        if(!user){
             return  res.json({success:false,message:"email not exists"});
        }
      
        const compPassword = bcrypt.compare(user.password,password);

        if(!compPassword){
            return  res.json({success:false,message:"Incorrect password"});
        }
       
        const token =await GenToken(user._id);
        res.cookie("token", token, {
    httpOnly: true,           
    maxAge: 1000 * 60 * 60 * 24 * 7, 
    sameSite: "strict",       
    secure: false             
});

 return  res.json({success:true,message:user});



    } catch (error) {
        console.log(error);
        return   res.json({success:false,message:"Server error"});
    }
}

export const Logout = (req, res) => {
  res.clearCookie("token");
  res.send("logout done");
};
