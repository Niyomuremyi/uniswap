import { Link } from 'react-router-dom';
import { getItems, getPartners } from '../lib/storage';
import ItemCard from '../components/ItemCard';
import { useT } from '../lib/i18n';

export default function Home() {
  const { t } = useT();
  const items = getItems();
  const partners = getPartners();
  const featured = items.slice(0, 4);

  return (
    <div className="home">

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text fade-up">
            <span className="hero-tag">{t('home.heroTag')}</span>
            <h1>{t('home.heroTitle1')}<br /><span className="gradient-text">{t('home.heroTitle2')}</span></h1>
            <p className="muted">{t('home.heroText')}</p>
            <div className="hero-btns">
              <Link to="/browse" className="btn btn-primary">{t('home.browseBtn')}</Link>
              <Link to="/sell" className="btn btn-ghost">{t('home.sellBtn')}</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow"></div>
            <div className="mini-card glass float" style={{ animationDelay: '0s' }}>
              <div className="mini-img"><img src="/images/fridge.webp" alt="" /></div>
              <h4>Mini Fridge</h4>
              <span className="mini-price">¥350</span>
              <p className="mini-meta">Good · Main Campus</p>
            </div>
            <div className="mini-card glass float mini-card-2" style={{ animationDelay: '0.8s' }}>
              <span className="mini-hot">🔥 HOT</span>
              <div className="mini-img"><img src="/images/laptop.jpeg" alt="" /></div>
              <h4>Used Laptop</h4>
              <span className="mini-price">¥1,500</span>
              <p className="mini-meta">Good · Main Campus</p>
            </div>
            <div className="mini-card glass float mini-card-3" style={{ animationDelay: '1.4s' }}>
              <div className="mini-img"><img src="/images/speaker.jpg" alt="" /></div>
              <h4>Bluetooth Speaker</h4>
              <span className="mini-price">¥180</span>
              <p className="mini-meta">Like new · South Campus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container stats-row">
        <div className="stat glass"><h3>{items.length}+</h3><p className="muted">{t('home.statItems')}</p></div>
        <div className="stat glass"><h3>3</h3><p className="muted">{t('home.statCats')}</p></div>
        <div className="stat glass"><h3>{partners.length}+</h3><p className="muted">{t('home.statPartners')}</p></div>
        <div className="stat glass"><h3>100%</h3><p className="muted">{t('home.statStudent')}</p></div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>{t('home.howTitle1')} <span className="gradient-text">{t('home.howTitle2')}</span></h2>
          <p className="muted">{t('home.howSub')}</p>
        </div>
        <div className="steps">
          <div className="step glass"><div className="step-num">1</div><h4>{t('home.step1Title')}</h4><p className="muted">{t('home.step1Text')}</p></div>
          <div className="step glass"><div className="step-num">2</div><h4>{t('home.step2Title')}</h4><p className="muted">{t('home.step2Text')}</p></div>
          <div className="step glass"><div className="step-num">3</div><h4>{t('home.step3Title')}</h4><p className="muted">{t('home.step3Text')}</p></div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head row">
          <div>
            <h2>{t('home.featuredTitle1')} <span className="gradient-text">{t('home.featuredTitle2')}</span></h2>
            <p className="muted">{t('home.featuredSub')}</p>
          </div>
          <Link to="/browse" className="btn btn-ghost">{t('home.viewAll')}</Link>
        </div>
        <div className="grid-4">
          {featured.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="container section">
        <div className="cta-banner glass">
          <div>
            <h2>{t('home.ctaTitle1')} <span className="gradient-text">{t('home.ctaTitle2')}</span></h2>
            <p className="muted">{t('home.ctaText')}</p>
          </div>
          <Link to="/partners" className="btn btn-primary">{t('home.findPartner')}</Link>
        </div>
      </section>

    </div>
  );
}