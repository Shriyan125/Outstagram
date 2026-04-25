import { useState } from 'react';
import './Messages.css';

const chatsData = [
  { id: 1, username: 'alex_dev', name: 'Alex Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', lastMsg: 'Hey! What are you building?', time: '2m', unread: 2, online: true },
  { id: 2, username: 'priya.sh', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', lastMsg: 'That photo was stunning 😍', time: '15m', unread: 0, online: true },
  { id: 3, username: 'karan.fit', name: 'Karan Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', lastMsg: 'Gym tomorrow? 💪', time: '1h', unread: 1, online: false },
  { id: 4, username: 'sneha_art', name: 'Sneha Art', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', lastMsg: 'Check out my new artwork!', time: '3h', unread: 0, online: false },
  { id: 5, username: 'meera_photo', name: 'Meera Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', lastMsg: 'Thanks for the follow ❤️', time: '1d', unread: 0, online: false },
];

const messagesData = {
  1: [
    { id: 1, from: 'alex_dev', text: 'Hey bro! What are you building these days?', time: '10:00 AM' },
    { id: 2, from: 'me', text: 'Working on Outstagram — an Instagram clone in React! 🚀', time: '10:02 AM' },
    { id: 3, from: 'alex_dev', text: 'No way! That sounds awesome 🔥', time: '10:03 AM' },
    { id: 4, from: 'alex_dev', text: 'How are you handling the routing?', time: '10:03 AM' },
    { id: 5, from: 'me', text: 'Using react-router-dom v6. Pretty clean actually!', time: '10:05 AM' },
  ],
  2: [
    { id: 1, from: 'priya.sh', text: 'That photo was stunning 😍', time: '9:45 AM' },
    { id: 2, from: 'me', text: 'Thank you so much! ❤️', time: '9:47 AM' },
  ],
  3: [
    { id: 1, from: 'karan.fit', text: 'Gym tomorrow? 💪', time: '8:30 AM' },
    { id: 2, from: 'me', text: 'Absolutely! 6 AM?', time: '8:32 AM' },
    { id: 3, from: 'karan.fit', text: '6:30 works better for me', time: '8:33 AM' },
  ],
};

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(chatsData[0]);
  const [messages, setMessages] = useState(messagesData[1] || []);
  const [input, setInput] = useState('');

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages(messagesData[chat.id] || []);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="messages fade-in">
      {/* Left Panel */}
      <div className="messages__sidebar">
        <div className="messages__sidebar-header">
          <h2 className="messages__title">Messages</h2>
          <button className="messages__new-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        <div className="messages__search-wrap">
          <input type="text" placeholder="Search" className="messages__search" />
        </div>

        <div className="messages__chats">
          {chatsData.map(chat => (
            <div
              key={chat.id}
              className={`messages__chat-item ${selectedChat?.id === chat.id ? 'messages__chat-item--active' : ''}`}
              onClick={() => handleSelectChat(chat)}
            >
              <div className="messages__chat-avatar-wrap">
                <img src={chat.avatar} alt={chat.username} className="messages__chat-avatar" />
                {chat.online && <span className="messages__online-dot" />}
              </div>
              <div className="messages__chat-info">
                <div className="messages__chat-top">
                  <span className="messages__chat-username">{chat.username}</span>
                  <span className="messages__chat-time">{chat.time}</span>
                </div>
                <div className="messages__chat-bottom">
                  <span className={`messages__chat-last ${chat.unread ? 'messages__chat-last--unread' : ''}`}>
                    {chat.lastMsg}
                  </span>
                  {chat.unread > 0 && <span className="messages__unread-badge">{chat.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="messages__chat">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="messages__chat-header">
              <div className="messages__chat-header-user">
                <div className="messages__chat-avatar-wrap">
                  <img src={selectedChat.avatar} alt={selectedChat.username} className="messages__chat-header-avatar" />
                  {selectedChat.online && <span className="messages__online-dot" />}
                </div>
                <div>
                  <p className="messages__chat-header-username">{selectedChat.username}</p>
                  <p className="messages__chat-header-status">{selectedChat.online ? 'Active now' : 'Active recently'}</p>
                </div>
              </div>
              <div className="messages__chat-header-actions">
                <button className="messages__icon-btn" title="Voice Call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <button className="messages__icon-btn" title="Video Call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </button>
                <button className="messages__icon-btn" title="Info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="messages__body">
              {messages.map(msg => (
                <div key={msg.id} className={`messages__msg-row ${msg.from === 'me' ? 'messages__msg-row--sent' : 'messages__msg-row--received'}`}>
                  {msg.from !== 'me' && (
                    <img src={selectedChat.avatar} alt="" className="messages__msg-avatar" />
                  )}
                  <div className={`messages__bubble ${msg.from === 'me' ? 'messages__bubble--sent' : 'messages__bubble--received'}`}>
                    {msg.text}
                  </div>
                  <span className="messages__msg-time">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <form className="messages__input-bar" onSubmit={handleSend}>
              <button type="button" className="messages__emoji-btn">😊</button>
              <input
                type="text"
                placeholder="Message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="messages__input"
              />
              {input.trim() ? (
                <button type="submit" className="messages__send-btn">Send</button>
              ) : (
                <button type="button" className="messages__icon-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              )}
            </form>
          </>
        ) : (
          <div className="messages__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h3>Your Messages</h3>
            <p>Send private photos and messages to a friend or group.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
