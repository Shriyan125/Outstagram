import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const suggestionsData = [
  { id: 1, username: 'alex_dev', name: 'Alex Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', mutual: '5 mutual followers' },
  { id: 2, username: 'priya.sh', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', mutual: 'Followed by raj_codes' },
  { id: 3, username: 'karan.fit', name: 'Karan Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', mutual: 'Followed by sneha_art' },
  { id: 4, username: 'meera_photo', name: 'Meera Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', mutual: '3 mutual followers' },
  { id: 5, username: 'arjun.tech', name: 'Arjun Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', mutual: 'New to Instagram' },
];

const currentUser = {
  username: 'larry_me',
  name: 'Larry',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=larry',
  followers: '1,248',
};

const Sidebar = () => {
  const [suggestions, setSuggestions] = useState(
    suggestionsData.map(s => ({ ...s, following: false }))
  );

  const handleFollow = (id) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, following: !s.following } : s)
    );
  };

  return (
    <aside className="sidebar">
      {/* Current User */}
      <div className="sidebar__user">
        <Link to={`/profile/${currentUser.username}`} className="sidebar__user-avatar-link">
          <img src={currentUser.avatar} alt={currentUser.username} className="sidebar__user-avatar" />
        </Link>
        <div className="sidebar__user-info">
          <Link to={`/profile/${currentUser.username}`} className="sidebar__user-username">
            {currentUser.username}
          </Link>
          <span className="sidebar__user-name">{currentUser.name}</span>
        </div>
        <Link to="/edit-profile" className="sidebar__switch-btn">Switch</Link>
      </div>

      {/* Suggestions */}
      <div className="sidebar__suggestions">
        <div className="sidebar__suggestions-header">
          <span className="sidebar__suggestions-title">Suggested for you</span>
          <Link to="/explore" className="sidebar__see-all">See All</Link>
        </div>

        {suggestions.map(user => (
          <div key={user.id} className="sidebar__suggestion">
            <Link to={`/profile/${user.username}`} className="sidebar__suggestion-avatar-link">
              <img src={user.avatar} alt={user.username} className="sidebar__suggestion-avatar" />
            </Link>
            <div className="sidebar__suggestion-info">
              <Link to={`/profile/${user.username}`} className="sidebar__suggestion-username">
                {user.username}
              </Link>
              <span className="sidebar__suggestion-mutual">{user.mutual}</span>
            </div>
            <button
              className={`sidebar__follow-btn ${user.following ? 'sidebar__follow-btn--following' : ''}`}
              onClick={() => handleFollow(user.id)}
            >
              {user.following ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="sidebar__footer">
        <div className="sidebar__footer-links">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms'].map(link => (
            <a key={link} href="#" className="sidebar__footer-link">{link}</a>
          ))}
        </div>
        <p className="sidebar__copyright">© 2024 OUTSTAGRAM FROM META</p>
      </div>
    </aside>
  );
};

export default Sidebar;
