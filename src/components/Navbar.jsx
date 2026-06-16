import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser, logout } from '../lib/storage';
import { useT } from '../lib/i18n';

export default function Navbar() {
  const { t, lang, toggleLang } = useT();
  const [user, setUser] = useState(getCurrentUser());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setUser(getCurrentUser()); setOpen(false); }, [location]);

  function handleLogout() { logout(); setUser(null); navigate('/'); }

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/browse', label: t('nav.browse') },
    { to: '/sell', label: t('nav.sell') },
    { to: '/partners', label: t('nav.partners') },
    { to: '/about', label: t('nav.about') },
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
            <button className="lang-toggle" onClick={toggleLang}>{lang === 'en' ? '中文' : 'EN'}</button>
            {user ? (
              <>
                <NavLink to="/dashboard" className="btn btn-ghost">{t('nav.dashboard')}</NavLink>
                <button className="btn btn-primary" onClick={handleLogout}>{t('nav.logout')}</button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-primary">{t('nav.login')}</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}