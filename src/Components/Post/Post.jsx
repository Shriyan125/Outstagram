import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [saved, setSaved] = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showHeart, setShowHeart] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  const handleLike = () => {
    setLiked(prev => {
      const newLiked = !prev;
      setLikeCount(c => newLiked ? c + 1 : c - 1);
      return newLiked;
    });
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!liked) {
        setLiked(true);
        setLikeCount(c => c + 1);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
    setLastTap(now);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments(prev => [...prev, { id: Date.now(), username: 'larry_me', text: comment.trim() }]);
      setComment('');
    }
  };

  const handleSave = () => setSaved(prev => !prev);

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <article className="post fade-in">
      {/* Post Header */}
      <div className="post__header">
        <Link to={`/profile/${post.username}`} className="post__user">
          <div className={`post__avatar-ring ${post.hasStory ? 'post__avatar-ring--active' : ''}`}>
            <img src={post.avatar} alt={post.username} className="post__avatar" />
          </div>
          <div className="post__user-info">
            <span className="post__username">{post.username}</span>
            {post.location && <span className="post__location">{post.location}</span>}
          </div>
        </Link>
        <button className="post__more-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Post Image */}
      <div className="post__image-wrapper" onClick={handleDoubleTap}>
        <img src={post.image} alt="Post" className="post__image" loading="lazy" />
        {showHeart && (
          <div className="post__heart-animation">
            <svg viewBox="0 0 24 24" fill="#fff">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="post__actions">
        <div className="post__actions-left">
          <button
            className={`post__action-btn ${liked ? 'post__action-btn--liked' : ''}`}
            onClick={handleLike}
            title="Like"
          >
            <svg viewBox="0 0 24 24" fill={liked ? '#ed4956' : 'none'} stroke={liked ? '#ed4956' : 'currentColor'} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button className="post__action-btn" title="Comment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <button className="post__action-btn" title="Share">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>

        <button className={`post__action-btn ${saved ? 'post__action-btn--saved' : ''}`} onClick={handleSave} title="Save">
          <svg viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Like Count */}
      <div className="post__likes">
        <span><strong>{likeCount.toLocaleString()}</strong> likes</span>
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="post__caption">
          <Link to={`/profile/${post.username}`} className="post__caption-username">{post.username}</Link>
          <span className="post__caption-text"> {post.caption}</span>
        </div>
      )}

      {/* Comments */}
      <div className="post__comments">
        {comments.length > 2 && !showAllComments && (
          <button className="post__view-comments" onClick={() => setShowAllComments(true)}>
            View all {comments.length} comments
          </button>
        )}
        {visibleComments.map(c => (
          <div key={c.id} className="post__comment">
            <Link to={`/profile/${c.username}`} className="post__comment-username">{c.username}</Link>
            <span className="post__comment-text"> {c.text}</span>
          </div>
        ))}
      </div>

      {/* Timestamp */}
      <span className="post__time">{post.time}</span>

      {/* Comment Input */}
      <form className="post__add-comment" onSubmit={handleComment}>
        <span className="post__emoji-btn">😊</span>
        <input
          type="text"
          placeholder="Add a comment…"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="post__comment-input"
        />
        {comment.trim() && (
          <button type="submit" className="post__post-btn">Post</button>
        )}
      </form>
    </article>
  );
};

export default Post;
