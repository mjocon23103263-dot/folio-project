// frontend/src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        🚴 Cycling Adventures
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
          {user ? (
            <>
              <li>
                <Link to="/create">Create Post</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              {user.role === 'admin' && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          <li>
            <button onClick={toggleTheme} className="theme-btn" title={isDark ? 'Light Mode' : 'Dark Mode'}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;