import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, logout } from '../lib/storage';

export default function Navbar() {
  const [user, setUser] = useState(getCurrentUser());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // refresh login state whenever the page changes
  useEffect(() => {
    setUser(getCurrentUser());
    setOpen(false);
  }, [location]);

  function handleLogout() {
    logout();
    setUser(null);
    navigate('/');
  }

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/browse', label: 'Browse' },
    { to: '/sell', label: 'Sell' },
    { to: '/partners', label: 'Partners' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <NavLink to="/" className="brand">Uni<span className="gradient-text">swap</span></NavLink>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>

        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <NavLink to="/dashboard" className="btn btn-ghost">My Dashboard</NavLink>
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary">Login / Register</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}