import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    phone: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    favorites: {
      type: Array,
      default: [],
    },

    resetOtp: {
      type: String,
    },

    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
