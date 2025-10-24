import { useState, useEffect } from "react";
import axios from "axios";

function ChatItem({ item, selected, onClick }) {
  return (
    <div className={`chat-item ${selected ? "selected" : ""}`} onClick={() => onClick(item)}>
      <div className="avatar-wrap">
        <img src={item.avatar} alt={item.name} className="avatar" />
        {item.status && <span className={`status-dot ${item.status}`} />}
      </div>
      <div className="chat-meta">
        <div className="top-row">
          <div className="name">{item.name}</div>
          <div className="time">{item.lastMessageTime}</div>
        </div>
        <div className="bottom-row">
          <div className="last">{item.lastMessage}</div>
        </div>
      </div>
    </div>
  );
}



export default function SideListChats({ onSelectChat, currentUser }) {
  
  const [conversations, setConversations] = useState([]);


  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.SERVER_URL}/api/conversations/${currentUser._id}`);
        setConversations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, [currentUser._id]);

  return (
    <aside className="side-list">
      <header className="side-header">
        <div className="title">Chatter.</div>
        <div className="actions">
          <button className="btn small">New</button>
          <button className="btn primary">Create Group</button>
        </div>
      </header>

      <div className="list">
        {conversations.map((c, i) => (
          <ChatItem key={c._id} item={c} onClick={onSelectChat} selected={i === 0} />
        ))}
      </div>
    </aside>
  );
}
