import { useState } from 'react';
import './Notifications.css';

const notificationsData = [
  { id: 1, type: 'like', username: 'alex_dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', text: 'liked your photo.', time: '2 minutes ago', postImg: 'https://picsum.photos/seed/notify1/60/60', read: false },
  { id: 2, type: 'follow', username: 'priya.sh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', text: 'started following you.', time: '15 minutes ago', postImg: null, read: false },
  { id: 3, type: 'comment', username: 'karan.fit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', text: 'commented: "That looks amazing! 🔥"', time: '1 hour ago', postImg: 'https://picsum.photos/seed/notify2/60/60', read: false },
  { id: 4, type: 'like', username: 'sneha_art', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', text: 'liked your photo.', time: '3 hours ago', postImg: 'https://picsum.photos/seed/notify3/60/60', read: true },
  { id: 5, type: 'follow', username: 'meera_photo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', text: 'started following you.', time: '5 hours ago', postImg: null, read: true },
  { id: 6, type: 'mention', username: 'arjun.tech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', text: 'mentioned you in a comment: "@larry_me check this out!"', time: '1 day ago', postImg: 'https://picsum.photos/seed/notify4/60/60', read: true },
  { id: 7, type: 'like', username: 'raj_codes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj', text: 'and 23 others liked your photo.', time: '2 days ago', postImg: 'https://picsum.photos/seed/notify5/60/60', read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [followedBack, setFollowedBack] = useState({});

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const handleFollowBack = (username) => {
    setFollowedBack(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const typeIcon = (type) => {
    switch(type) {
      case 'like': return '❤️';
      case 'follow': return '👤';
      case 'comment': return '💬';
      case 'mention': return '@';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications fade-in">
      <div className="notifications__container">
        <div className="notifications__header">
          <h2 className="notifications__title">Notifications</h2>
          {unreadCount > 0 && (
            <button className="notifications__mark-read" onClick={markAllRead}>
              Mark all as read
            </button>
          )}
        </div>

        {/* New */}
        {unreadCount > 0 && (
          <div className="notifications__group">
            <h3 className="notifications__group-title">New</h3>
            {notifications.filter(n => !n.read).map(notif => (
              <NotificationItem
                key={notif.id}
                notif={notif}
                followedBack={followedBack}
                onFollowBack={handleFollowBack}
                typeIcon={typeIcon}
              />
            ))}
          </div>
        )}

        {/* Earlier */}
        <div className="notifications__group">
          <h3 className="notifications__group-title">Earlier</h3>
          {notifications.filter(n => n.read).map(notif => (
            <NotificationItem
              key={notif.id}
              notif={notif}
              followedBack={followedBack}
              onFollowBack={handleFollowBack}
              typeIcon={typeIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NotificationItem = ({ notif, followedBack, onFollowBack, typeIcon }) => (
  <div className={`notifications__item ${!notif.read ? 'notifications__item--unread' : ''}`}>
    <div className="notifications__item-left">
      <div className="notifications__avatar-wrap">
        <img src={notif.avatar} alt={notif.username} className="notifications__avatar" />
        <span className="notifications__type-icon">{typeIcon(notif.type)}</span>
      </div>
      <div className="notifications__content">
        <p className="notifications__text">
          <strong>{notif.username}</strong> {notif.text}
        </p>
        <span className="notifications__time">{notif.time}</span>
      </div>
    </div>
    <div className="notifications__item-right">
      {notif.type === 'follow' ? (
        <button
          className={`notifications__follow-btn ${followedBack[notif.username] ? 'notifications__follow-btn--following' : ''}`}
          onClick={() => onFollowBack(notif.username)}
        >
          {followedBack[notif.username] ? 'Following' : 'Follow back'}
        </button>
      ) : notif.postImg ? (
        <img src={notif.postImg} alt="Post" className="notifications__post-thumb" />
      ) : null}
    </div>
  </div>
);

export default Notifications;
