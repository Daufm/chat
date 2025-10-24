// controllers/messageController.js
import Message from "../models/Message.js";


export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const sendMessage = async (req, res) => {
  try {
    const { text, senderId, conversationId } = req.body;

    if (!text || !senderId || !conversationId)
      return res.status(400).json({ message: "All fields are required" });

    const message = await Message.create({ text, sender: senderId, conversation: conversationId });
    const populated = await message.populate("sender", "name avatar");

    // emit to socket
    if (req.io) {
      req.io.to(conversationId).emit("receive_message", populated);
    }

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
