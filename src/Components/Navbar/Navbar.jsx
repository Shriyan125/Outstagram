import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/explore', icon: 'explore', label: 'Explore' },
    { to: '/reels', icon: 'reels', label: 'Reels' },
    { to: '/messages', icon: 'messages', label: 'Messages' },
    { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    { to: '/create', icon: 'create', label: 'Create' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">Outstagram</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar__search" onSubmit={handleSearch}>
          <div className="navbar__search-wrapper">
            <svg className="navbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
          </div>
        </form>

        {/* Desktop Nav Icons */}
        <div className="navbar__icons">
          <Link to="/" className={`navbar__icon-btn ${location.pathname === '/' ? 'active' : ''}`} title="Home">
            <svg viewBox="0 0 24 24" fill={location.pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>

          <Link to="/explore" className={`navbar__icon-btn ${location.pathname === '/explore' ? 'active' : ''}`} title="Explore">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>

          <Link to="/reels" className={`navbar__icon-btn ${location.pathname === '/reels' ? 'active' : ''}`} title="Reels">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </Link>

          <Link to="/messages" className={`navbar__icon-btn ${location.pathname === '/messages' ? 'active' : ''}`} title="Messages">
            <div className="navbar__icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="navbar__badge">3</span>
            </div>
          </Link>

          <Link to="/notifications" className={`navbar__icon-btn ${location.pathname === '/notifications' ? 'active' : ''}`} title="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </Link>

          <Link to={`/profile/${currentUser?.username || 'me'}`} className="navbar__avatar-btn" title="Profile">
            <img
              src={currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'user'}`}
              alt="Profile"
              className="navbar__avatar"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="navbar__mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="navbar__mobile-link" onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
