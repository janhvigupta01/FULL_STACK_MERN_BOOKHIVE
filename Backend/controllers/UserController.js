import { GenToken } from "../config/Gentoken.js";
import User  from "../models/UserModel.js"
import bcrypt from "bcryptjs"
import { sendOtpMail } from "../utils/mail.js";
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

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};





// edit profile



export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updatedData = {};

    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;

    // ✅ If image is uploaded
    if (req.file && req.file.path) {
      updatedData.image = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updatedData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};


// forgot password and reset password controllers are in UserController.js



export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }); // ✅ findOne instead of find

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // ✅ 5 minutes expiry
    user.isOtpVerified = false;

    await user.save(); // ✅ save document

    await sendOtpMail(email, otp);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email }); // ✅ findOne

    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isOtpVerified = true; // ✅ fixed field name
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  // ✅ fixed signature
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // ✅ findOne

    if (!user || !user.isOtpVerified) {
      return res.json({
        success: false,
        message: "OTP verification required",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false; // reset flag

    await user.save(); // ✅ save document
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};