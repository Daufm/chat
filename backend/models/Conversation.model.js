import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    name: { type: String }, // optional (used only for group)
    type: { type: String, enum: ["dm", "group"], required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
     isPublic: { type: Boolean, default: false },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
