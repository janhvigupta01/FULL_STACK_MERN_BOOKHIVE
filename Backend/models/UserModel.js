import mongoose from "mongoose";

/* 🔥 HISTORY SCHEMA (API BASED BOOKS) */
const recentlyViewedSchema = new mongoose.Schema({
  bookId: {
    type: String,          // API book ID (Google Books / Open Library)
    required: true,
  },
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  authors: {
    type: [String],
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

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

    /* 🔥 HISTORY FEATURE */
    recentlyViewed: {
      type: [recentlyViewedSchema],
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
