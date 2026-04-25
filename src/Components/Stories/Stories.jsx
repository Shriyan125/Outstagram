import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stories.css';

export const storiesData = [
  { id: 1, username: 'your_story', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=larry', isOwn: true, seen: false, image: 'https://picsum.photos/seed/story1/400/700' },
  { id: 2, username: 'alex_dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', seen: false, image: 'https://picsum.photos/seed/story2/400/700' },
  { id: 3, username: 'priya.sh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', seen: false, image: 'https://picsum.photos/seed/story3/400/700' },
  { id: 4, username: 'raj_codes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj', seen: true, image: 'https://picsum.photos/seed/story4/400/700' },
  { id: 5, username: 'sneha_art', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha', seen: false, image: 'https://picsum.photos/seed/story5/400/700' },
  { id: 6, username: 'karan.fit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan', seen: true, image: 'https://picsum.photos/seed/story6/400/700' },
  { id: 7, username: 'meera_photo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meera', seen: false, image: 'https://picsum.photos/seed/story7/400/700' },
  { id: 8, username: 'arjun.tech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun', seen: false, image: 'https://picsum.photos/seed/story8/400/700' },
];

const Stories = () => {
  const [stories, setStories] = useState(storiesData);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleStoryClick = (story, index) => {
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, seen: true } : s));
    navigate(`/story/${story.id}`);
  };

  // Removed handleNext and handlePrev since we use simple routing now

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="stories-container">
      <button className="stories__scroll-btn stories__scroll-btn--left" onClick={() => scroll(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="stories__track" ref={scrollRef}>
        {stories.map((story, index) => (
          <div key={story.id} className="story-item" onClick={() => handleStoryClick(story, index)}>
            <div className={`story-item__ring ${story.seen ? 'story-item__ring--seen' : ''} ${story.isOwn ? 'story-item__ring--own' : ''}`}>
              <div className="story-item__avatar-wrap">
                {story.isOwn ? (
                  <>
                    <img src={story.avatar} alt={story.username} className="story-item__avatar" />
                    <div className="story-item__add-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <img src={story.avatar} alt={story.username} className="story-item__avatar" />
                )}
              </div>
            </div>
            <span className="story-item__username">{story.isOwn ? 'Your story' : story.username}</span>
          </div>
        ))}
      </div>

      <button className="stories__scroll-btn stories__scroll-btn--right" onClick={() => scroll(1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* StoryModal removed as we navigate to another route now */}
    </div>
  );
};

export default Stories;
