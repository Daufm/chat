
import React from 'react';
import '../style/SideListChats.css';

const sampleChats = {
  direct: [
    { id: 1, name: 'Ava Martin', avatar: '/avatars/ava.jpg', status: 'online', last: "Let's finalize the deck today.", time: '2:45 PM' },
    { id: 2, name: 'Diego Patel', avatar: '/avatars/diego.jpg', status: 'away', last: 'Uploading assets now.', time: '1:18 PM' },
    { id: 3, name: 'Lina Zhao', avatar: '/avatars/lina.jpg', status: 'offline', last: 'Got it. Will review tomorrow.', time: 'Yesterday' },
  ],
  groups: [
    { id: 11, name: 'Design Weekly', avatar: '/avatars/design.jpg', last: 'Next sprint scope draft', time: '12:02 PM' },
    { id: 12, name: 'Engineering', avatar: '/avatars/eng.jpg', last: 'CI pipeline fixed ✅', time: '9:40 AM' },
    { id: 13, name: 'All-Hands', avatar: '/avatars/allhands.jpg', last: 'Slides ready for review', time: 'Mon' },
  ]
};

function ChatItem({ item, selected, isDirect }) {
  return (
    <div className={`chat-item ${selected ? 'selected' : ''}`}>
      <div className="avatar-wrap">
        <img src={item.avatar} alt={item.name} className="avatar" />
        {isDirect && <span className={`status-dot ${item.status || 'offline'}`} />}
      </div>
      <div className="chat-meta">
        <div className="top-row">
          <div className="name">{item.name}</div>
          <div className="time">{item.time}</div>
        </div>
        <div className="bottom-row">
          <div className="last">{item.last}</div>
        </div>
      </div>
    </div>
  );
}



export default function SideListChats() {
  return (
    <aside className="side-list">
      <header className="side-header">
        <div className="title ">Chatter.</div>
        <div className="actions">
          <button className="btn small">New</button>
          <button className="btn primary">Create Group</button>
        </div>
      </header>

      <div className="search">
        <input placeholder="Search people, groups" />
      </div>

      <div className="section">
        <div className="section-title">Direct Messages</div>
        <div className="list">
          {sampleChats.direct.map((c, i) => (
            <ChatItem key={c.id} item={c} isDirect selected={i === 0} />
          ))}
        </div>
      </div>

      <div className="section groups">
        <div className="section-title">Groups</div>
        <div className="list">
          {sampleChats.groups.map((g) => (
            <ChatItem key={g.id} item={g} />
          ))}
        </div>
      </div>

      <footer className="side-footer">
        <button className="ghost">Join Group</button>
        <button className="ghost">Group Settings</button>
      </footer>
    </aside>
  );
}


