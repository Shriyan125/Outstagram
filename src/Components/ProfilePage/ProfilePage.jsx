import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProfilePage.css';

const profilesData = {
  larry_me: {
    username: 'larry_me',
    name: 'Larry',
    bio: '📸 BTech CSE | 🚀 React Dev | ✨ Building cool stuff\n🎓 First Year Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=larry',
    posts: 24,
    followers: 1248,
    following: 342,
    isOwnProfile: true,
    images: [
      'https://picsum.photos/seed/p1/300/300',
      'https://picsum.photos/seed/p2/300/300',
      'https://picsum.photos/seed/p3/300/300',
      'https://picsum.photos/seed/p4/300/300',
      'https://picsum.photos/seed/p5/300/300',
      'https://picsum.photos/seed/p6/300/300',
      'https://picsum.photos/seed/p7/300/300',
      'https://picsum.photos/seed/p8/300/300',
      'https://picsum.photos/seed/p9/300/300',
    ],
  },
  alex_dev: {
    username: 'alex_dev',
    name: 'Alex Kumar',
    bio: '💻 Full Stack Developer | Open Source Enthusiast\n🔥 Passionate about building scalable apps',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    posts: 89,
    followers: 15200,
    following: 512,
    isOwnProfile: false,
    images: [
      'https://picsum.photos/seed/a1/300/300',
      'https://picsum.photos/seed/a2/300/300',
      'https://picsum.photos/seed/a3/300/300',
      'https://picsum.photos/seed/a4/300/300',
      'https://picsum.photos/seed/a5/300/300',
      'https://picsum.photos/seed/a6/300/300',
    ],
  },
};

const defaultProfile = (username) => ({
  username,
  name: username.replace(/[._]/g, ' '),
  bio: 'Instagram user',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
  posts: Math.floor(Math.random() * 100 + 10),
  followers: Math.floor(Math.random() * 10000 + 100),
  following: Math.floor(Math.random() * 500 + 50),
  isOwnProfile: false,
  images: Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/${username}${i}/300/300`),
});

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = profilesData[username] || defaultProfile(username);
      setProfile(found);
      setLoading(false);
    }, 600);
  }, [username]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-page__loading">
          <div className="skeleton" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '16px' }} />
          <div className="skeleton" style={{ width: '180px', height: '16px', marginBottom: '10px' }} />
          <div className="skeleton" style={{ width: '250px', height: '14px' }} />
        </div>
      </div>
    );
  }

  const formatCount = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  return (
    <div className="profile-page fade-in">
      <div className="profile-page__container">
        {/* Header */}
        <div className="profile-page__header">
          <div className="profile-page__avatar-wrap">
            <img src={profile.avatar} alt={profile.username} className="profile-page__avatar" />
          </div>

          <div className="profile-page__info">
            <div className="profile-page__top-row">
              <h1 className="profile-page__username">{profile.username}</h1>
              {profile.isOwnProfile ? (
                <div className="profile-page__own-actions">
                  <Link to="/edit-profile" className="profile-page__btn profile-page__btn--outline">Edit Profile</Link>
                  <button className="profile-page__btn profile-page__btn--outline">Share Profile</button>
                </div>
              ) : (
                <div className="profile-page__actions">
                  <button
                    className={`profile-page__btn ${following ? 'profile-page__btn--outline' : 'profile-page__btn--primary'}`}
                    onClick={() => setFollowing(f => !f)}
                  >
                    {following ? 'Following' : 'Follow'}
                  </button>
                  <button className="profile-page__btn profile-page__btn--outline">Message</button>
                </div>
              )}
            </div>

            <div className="profile-page__stats">
              <div className="profile-page__stat">
                <strong>{formatCount(profile.posts)}</strong> <span>posts</span>
              </div>
              <div className="profile-page__stat">
                <strong>{formatCount(profile.followers)}</strong> <span>followers</span>
              </div>
              <div className="profile-page__stat">
                <strong>{formatCount(profile.following)}</strong> <span>following</span>
              </div>
            </div>

            <div className="profile-page__bio">
              <p className="profile-page__name">{profile.name}</p>
              <p className="profile-page__bio-text">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-page__tabs">
          {['posts', 'reels', 'tagged'].map(tab => (
            <button
              key={tab}
              className={`profile-page__tab ${activeTab === tab ? 'profile-page__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'posts' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              )}
              {tab === 'reels' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="2"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
              )}
              {tab === 'tagged' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              )}
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid */}
        {activeTab === 'posts' && (
          <div className="profile-page__grid">
            {profile.images.map((img, i) => (
              <div key={i} className="profile-page__grid-item">
                <img src={img} alt={`Post ${i + 1}`} className="profile-page__grid-img" loading="lazy" />
                <div className="profile-page__grid-overlay">
                  <div className="profile-page__grid-stats">
                    <span>❤️ {Math.floor(Math.random() * 5000 + 100)}</span>
                    <span>💬 {Math.floor(Math.random() * 200 + 5)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab !== 'posts' && (
          <div className="profile-page__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            <h3>No {activeTab} yet</h3>
            <p>When {activeTab} are shared, they'll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
