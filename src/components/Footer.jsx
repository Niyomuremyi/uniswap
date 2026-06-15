import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand">Uni<span className="gradient-text">swap</span></div>
          <p className="muted">Buy and sell student essentials, and find language partners — right on your campus.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><NavLink to="/browse">Browse items</NavLink></li>
            <li><NavLink to="/sell">Sell an item</NavLink></li>
            <li><NavLink to="/partners">Language partners</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><NavLink to="/login">Login / Register</NavLink></li>
            <li><NavLink to="/dashboard">My dashboard</NavLink></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© 2026 Uniswap — Student Marketplace</span>
        <span>Built by students, for students</span>
      </div>
    </footer>
  );
}