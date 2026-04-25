import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login button does nothing — shows error to steer user to demo login
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('Invalid credentials. Please use "Continue as Demo User" below.');
  };

  const handleDemoLogin = () => {
    onLogin({
      username: 'larry_me',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=larry',
    });
    navigate('/');
  };

  return (
    <div className="auth">
      <div className="auth__background">
        <div className="auth__bg-circle auth__bg-circle--1" />
        <div className="auth__bg-circle auth__bg-circle--2" />
        <div className="auth__bg-circle auth__bg-circle--3" />
      </div>

      <div className="auth__container fade-in">
        <div className="auth__card">
          {/* Logo */}
          <div className="auth__logo">
            <h1 className="auth__logo-text">Outstagram</h1>
            <p className="auth__tagline">Share your moments with the world ✨</p>
          </div>


          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              className="auth__input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="auth__input"
            />

            {error && <p className="auth__error">{error}</p>}

            <button type="submit" className="auth__submit-btn">
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="auth__divider">
            <span className="auth__divider-line" />
            <span className="auth__divider-text">OR</span>
            <span className="auth__divider-line" />
          </div>

          {/* Only real entry point */}
          <button className="auth__demo-btn" onClick={handleDemoLogin}>
            {/* Made the svg using heroicons.com, feathericons.com  */}
            <svg viewBox="0 0 48 48" width="22" height="22">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Continue as Demo User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
