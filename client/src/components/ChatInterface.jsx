
import { useState } from "react";
import SideListChats from "./SideListChats.jsx";
import ChatBored from "./ChatBored.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ChatInterface() {

  const { currentUser } = useAuth();
   const [selectedConversation, setSelectedConversation] = useState(null);

  if(currentUser === null) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">Please log in to access the chat interface.</div>
    )
  }




  return (
    <div className="flex h-screen">
      <div className="sticky top-0 h-screen overflow-y-auto w-80 flex-shrink-0">
        <SideListChats 
           onSelectChat={setSelectedConversation} 
           currentUser={currentUser} />
      </div>
      <div className="flex-1 bg-gray-100">
        {selectedConversation ? (
          <ChatBored conversationId={selectedConversation._id} currentUser={currentUser} />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">Select a chat</div>
        )}
      </div>
    </div>
  );
}
