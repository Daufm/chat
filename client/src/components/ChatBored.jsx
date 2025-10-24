import { useState, useEffect } from "react";
import { useSocket } from "./context/SocketContext.jsx";
import axios from "axios";

export default function ChatBored({ conversationId, currentUser }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
const [loading, setLoading] = useState(true);


  // Fetch messages from DB
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
        setLoading(true);
      try {
        const res = await axios.get(`/api/messages/${conversationId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [conversationId]);


  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      if (data.conversationId === conversationId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [socket, conversationId]);


  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg = {
      conversationId,
      senderId: currentUser._id,
      text: input,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to DB
      const res = await axios.post("/api/messages", newMsg);
      const savedMessage = res.data;

      // Update local state
      setMessages((prev) => [...prev, savedMessage]);

      // Emit via socket
      socket.emit("send_message", savedMessage);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f6fbff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="font-semibold text-gray-800">{conversationId}</div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar" id="chat-container">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
         ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
         ) : (
           <>
            {messages.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.senderId === currentUser._id ? "justify-end" : "justify-start"}`}
            >
              {m.senderId !== currentUser._id && (
              <img
                src={m.senderAvatar || "/avatars/default.jpg"}
                alt={m.senderName || "User"}
                className="w-8 h-8 rounded-full mr-3 self-end object-cover"
              />
            )}
            <div
              className={`max-w-[62%] px-4 py-3 text-sm ${
                m.senderId === currentUser._id
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
                  : "bg-blue-50 text-slate-800 rounded-2xl rounded-bl-none"
              }`}
            >
              {m.senderId !== currentUser._id && (
                <div className="font-semibold text-xs text-slate-700 mb-1">{m.senderName}</div>
              )}
              <div>{m.text}</div>
              <div className={`text-[11px] mt-2 ${m.senderId === currentUser._id ? "text-blue-100" : "text-gray-400"}`}>
                {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
                {m.senderId === currentUser._id && <div className="w-8 h-8 ml-3" />}
              </div>
            ))}
          </>
      )}
      </main>

      {/* Input */}
      <footer className="px-6 py-4 border-t bg-white">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-3 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Write a message..."
            aria-label="Message Input"
          />
          <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
