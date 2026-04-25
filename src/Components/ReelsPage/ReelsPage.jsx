import { useState, useEffect } from 'react';
import './ReelsPage.css';

const reelsData = [
  { id: 1, username: 'alex_dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', image: 'https://picsum.photos/seed/reel1/400/700', likes: 15200, comments: 342, caption: 'When the code finally works 🎉 #coding #developer', audio: '🎵 Original Audio - alex_dev' },
  { id: 2, username: 'priya.sh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', image: 'https://picsum.photos/seed/reel2/400/700', likes: 28900, comments: 892, caption: 'Sunset vibes only ✨ #sunset #photography #golden', audio: '🎵 Blinding Lights - The Weeknd' },
  { id: 3, username: 'karan.fit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', image: 'https://picsum.photos/seed/reel3/400/700', likes: 9800, comments: 210, caption: 'Gym motivation 💪 Never give up! #fitness #gym #workout', audio: '🎵 Eye of the Tiger - Survivor' },
  { id: 4, username: 'sneha_art', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', image: 'https://picsum.photos/seed/reel4/400/700', likes: 33100, comments: 765, caption: 'New art piece! 🎨 What do you think? #art #painting', audio: '🎵 Bohemian Rhapsody - Queen' },
  { id: 5, username: 'meera_photo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', image: 'https://picsum.photos/seed/reel5/400/700', likes: 7650, comments: 134, caption: 'Morning coffee ritual ☕ #coffee #morning #aesthetic', audio: '🎵 lo-fi beats to chill to' },
];

const ReelItem = ({ reel }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const [muted, setMuted] = useState(true);

  const handleLike = () => {
    setLiked(prev => {
      setLikeCount(c => prev ? c - 1 : c + 1);
      return !prev;
    });
  };

  return (
    <div className="reel-item">
      <div className="reel-item__media">
        <img src={reel.image} alt="Reel" className="reel-item__img" />
        <div className="reel-item__overlay" />
      </div>

      {/* User Info */}
      <div className="reel-item__info">
        <div className="reel-item__user">
          <img src={reel.avatar} alt={reel.username} className="reel-item__avatar" />
          <span className="reel-item__username">{reel.username}</span>
          <button className="reel-item__follow-btn">Follow</button>
        </div>
        <p className="reel-item__caption">{reel.caption}</p>
        <p className="reel-item__audio">{reel.audio}</p>
      </div>

      {/* Actions */}
      <div className="reel-item__actions">
        <button className={`reel-item__action-btn ${liked ? 'reel-item__action-btn--liked' : ''}`} onClick={handleLike}>
          <svg viewBox="0 0 24 24" fill={liked ? '#ed4956' : 'none'} stroke={liked ? '#ed4956' : 'white'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{(likeCount / 1000).toFixed(1)}k</span>
        </button>

        <button className="reel-item__action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{reel.comments}</span>
        </button>

        <button className="reel-item__action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          <span>Share</span>
        </button>

        <button className="reel-item__action-btn" onClick={() => setSaved(s => !s)}>
          <svg viewBox="0 0 24 24" fill={saved ? 'white' : 'none'} stroke="white" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>

        <button className="reel-item__action-btn" onClick={() => setMuted(m => !m)}>
          {muted
            ? <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          }
        </button>
      </div>
    </div>
  );
};

const ReelsPage = () => {
  return (
    <div className="reels-page fade-in">
      <div className="reels-page__container">
        {reelsData.map(reel => (
          <ReelItem key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
};

export default ReelsPage;
