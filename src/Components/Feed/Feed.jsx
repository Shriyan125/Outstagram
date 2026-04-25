import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import './Feed.css';

const postsData = [
  {
    id: 1,
    username: 'alex_dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    location: 'Mumbai, India',
    image: 'https://picsum.photos/seed/post1/600/600',
    likes: 4821,
    caption: 'Building something amazing today! 🚀 The grind never stops. #coding #developer #reactjs',
    time: '2 HOURS AGO',
    hasStory: true,
    liked: false,
    saved: false,
    comments: [
      { id: 1, username: 'priya.sh', text: 'Looks incredible! 🔥' },
      { id: 2, username: 'raj_codes', text: 'What stack are you using?' },
      { id: 3, username: 'karan.fit', text: 'Keep it up bro 💪' },
    ],
  },
  {
    id: 2,
    username: 'priya.sh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    location: 'Bangalore, India',
    image: 'https://picsum.photos/seed/post2/600/600',
    likes: 12345,
    caption: 'Golden hour magic ✨ Some moments are too beautiful not to capture. #photography #golden #vibes',
    time: '5 HOURS AGO',
    hasStory: true,
    liked: true,
    saved: false,
    comments: [
      { id: 1, username: 'alex_dev', text: 'Absolutely stunning 😍' },
      { id: 2, username: 'meera_photo', text: 'Your photography skills are unmatched!' },
    ],
  },
  {
    id: 3,
    username: 'karan.fit',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan',
    location: 'Delhi, India',
    image: 'https://picsum.photos/seed/post3/600/600',
    likes: 7890,
    caption: 'Morning workout complete 💪 No days off, only progress. #fitness #gym #motivation #health',
    time: '1 DAY AGO',
    hasStory: false,
    liked: false,
    saved: true,
    comments: [
      { id: 1, username: 'arjun.tech', text: 'Respect! 🙏' },
    ],
  },
  {
    id: 4,
    username: 'sneha_art',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
    location: 'Pune, India',
    image: 'https://picsum.photos/seed/post4/600/600',
    likes: 9234,
    caption: 'New artwork drop 🎨 Every stroke tells a story. Which part speaks to you the most? #art #digitalart #creative',
    time: '2 DAYS AGO',
    hasStory: true,
    liked: false,
    saved: false,
    comments: [
      { id: 1, username: 'priya.sh', text: 'This is breathtaking! 😭' },
      { id: 2, username: 'alex_dev', text: 'How long did this take?' },
      { id: 3, username: 'karan.fit', text: 'Talented! ✨' },
    ],
  },
  {
    id: 5,
    username: 'meera_photo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera',
    location: 'Hyderabad, India',
    image: 'https://picsum.photos/seed/post5/600/600',
    likes: 3456,
    caption: 'Just a perfect evening ☕ Coffee + good book = happiness. #aesthetic #cozy #lifestyle #coffee',
    time: '3 DAYS AGO',
    hasStory: false,
    liked: true,
    saved: true,
    comments: [
      { id: 1, username: 'sneha_art', text: 'Pure aesthetics 💯' },
    ],
  },
];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(postsData);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="feed">
        {[1, 2, 3].map(i => (
          <div key={i} className="feed__skeleton">
            <div className="feed__skeleton-header">
              <div className="skeleton feed__skeleton-avatar" />
              <div className="feed__skeleton-lines">
                <div className="skeleton feed__skeleton-line" style={{ width: '120px' }} />
                <div className="skeleton feed__skeleton-line" style={{ width: '80px', height: '10px', marginTop: '6px' }} />
              </div>
            </div>
            <div className="skeleton feed__skeleton-image" />
            <div style={{ padding: '12px 16px' }}>
              <div className="skeleton feed__skeleton-line" style={{ width: '100px', marginBottom: '8px' }} />
              <div className="skeleton feed__skeleton-line" style={{ width: '80%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
