import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, default: "/avatars/default.jpg" },
    email: { type: String, required: true, unique: true },
    verificationCode: { type: Number ,expires: '15m' },
    isVerified: { type: Boolean, default: false },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
