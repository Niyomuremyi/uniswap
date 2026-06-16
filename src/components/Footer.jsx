import { NavLink } from 'react-router-dom';
import { useT } from '../lib/i18n';

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand">Uni<span className="gradient-text">swap</span></div>
          <p className="muted">{t('footer.tagline')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('footer.explore')}</h4>
          <ul>
            <li><NavLink to="/browse">{t('footer.browseItems')}</NavLink></li>
            <li><NavLink to="/sell">{t('footer.sellItem')}</NavLink></li>
            <li><NavLink to="/partners">{t('footer.partners')}</NavLink></li>
            <li><NavLink to="/about">{t('footer.about')}</NavLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.account')}</h4>
          <ul>
            <li><NavLink to="/login">{t('footer.login')}</NavLink></li>
            <li><NavLink to="/dashboard">{t('footer.dashboard')}</NavLink></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.madeBy')}</span>
      </div>
    </footer>
  );
}