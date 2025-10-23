


export default function ChatBored() {
  const messages = [
    { id: 1, side: 'left', name: 'Ava', avatar: '/avatars/ava.jpg', text: 'Morning! Drafted the hero section variants.', time: '9:32 AM' },
    { id: 2, side: 'left', name: 'Diego', avatar: '/avatars/diego.jpg', text: "Nice. I'll hook them into the new layout.", time: '9:35 AM' },
    { id: 3, side: 'left', name: 'Lina', avatar: '/avatars/lina.jpg', text: 'Reviewing now. Also, header spacing feels tight.', time: '9:40 AM' },
    { id: 4, side: 'right', name: 'You', text: 'Sharing the fig link here.', time: '9:36 AM' },
    { id: 5, side: 'right', name: 'You', text: "Agreed. I'll increase the top padding by 8px.", time: '9:41 AM' }
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f6fbff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <img src="/avatars/design.jpg" alt="group" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold text-gray-800">Design Weekly</div>
            <div className="text-xs text-gray-500">8 members • Most active now</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm bg-white border rounded-md text-gray-700 hover:bg-gray-50">Add</button>
          <button className="px-3 py-1 text-sm bg-white border rounded-md text-gray-700 hover:bg-gray-50">Mute</button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Settings</button>
        </div>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="text-center text-xs text-gray-400">Today</div>

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.side === 'right' ? 'justify-end' : 'justify-start'}`}>
            {m.side === 'left' && (
              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full mr-3 self-end object-cover" />
            )}

            <div className={`max-w-[62%] px-4 py-3 text-sm ${m.side === 'right' ? 'bg-blue-600 text-white rounded-2xl rounded-br-none' : 'bg-blue-50 text-slate-800 rounded-2xl rounded-bl-none'}`}>
              {m.side === 'left' && <div className="font-semibold text-xs text-slate-700 mb-1">{m.name}</div>}
              <div>{m.text}</div>
              <div className={`text-[11px] mt-2 ${m.side === 'right' ? 'text-blue-100' : 'text-gray-400'}`}>{m.time}</div>
            </div>

            {m.side === 'right' && <div className="w-8 h-8 ml-3" />} {/* spacing for right side alignment */}
          </div>
        ))}
      </main>

      {/* Composer / footer */}
      <footer className="px-6 py-4 border-t bg-white">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white border text-gray-600">📎</button>
          <div className="flex-1">
            <input
              className="w-full px-4 py-3 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Write a message..."
              aria-label="Write a message"
            />
          </div>
          <button className="px-3 py-2 rounded-full bg-white border text-gray-600">😊</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full">Send</button>
        </div>
      </footer>
    </div>
  );
}
