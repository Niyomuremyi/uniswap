import { Link } from 'react-router-dom';
import { getItems, getPartners } from '../lib/storage';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const items = getItems();
  const partners = getPartners();
  const featured = items.slice(0, 4);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text fade-up">
            <span className="hero-tag">♻ Student Marketplace</span>
            <h1>Buy &amp; sell student<br /><span className="gradient-text">essentials on campus</span></h1>
            <p className="muted">Don't waste money buying new or throw good things away. Sell what you don't need, find what you do — right here with fellow students. Plus, find a language partner to learn together.</p>
            <div className="hero-btns">
              <Link to="/browse" className="btn btn-primary">Browse items</Link>
              <Link to="/sell" className="btn btn-ghost">Sell your stuff</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow"></div>
            <img className="hero-img float" style={{ animationDelay: '0s' }} src="/images/fridge.webp" alt="" />
            <img className="hero-img hero-img-2 float" style={{ animationDelay: '1.2s' }} src="/images/speaker.jpg" alt="" />
            <img className="hero-img hero-img-3 float" style={{ animationDelay: '0.6s' }} src="/images/laptop.jpeg" alt="" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container stats-row">
        <div className="stat glass"><h3>{items.length}+</h3><p className="muted">Items listed</p></div>
        <div className="stat glass"><h3>3</h3><p className="muted">Categories</p></div>
        <div className="stat glass"><h3>{partners.length}+</h3><p className="muted">Language partners</p></div>
        <div className="stat glass"><h3>100%</h3><p className="muted">Student to student</p></div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container section">
        <div className="section-head">
          <h2>How <span className="gradient-text">Uniswap</span> works</h2>
          <p className="muted">Three simple steps</p>
        </div>
        <div className="steps">
          <div className="step glass"><div className="step-num">1</div><h4>Post your item</h4><p className="muted">List anything you no longer need in a minute.</p></div>
          <div className="step glass"><div className="step-num">2</div><h4>Connect</h4><p className="muted">A buyer contacts you directly on WhatsApp.</p></div>
          <div className="step glass"><div className="step-num">3</div><h4>Swap &amp; save</h4><p className="muted">Meet on campus, hand over, done. Money saved, waste avoided.</p></div>
        </div>
      </section>

      {/* FEATURED ITEMS */}
      <section className="container section">
        <div className="section-head row">
          <div>
            <h2>Featured <span className="gradient-text">items</span></h2>
            <p className="muted">Fresh from fellow students</p>
          </div>
          <Link to="/browse" className="btn btn-ghost">View all</Link>
        </div>
        <div className="grid-4">
          {featured.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="container section">
        <div className="cta-banner glass">
          <div>
            <h2>Learn a language with a <span className="gradient-text">partner</span></h2>
            <p className="muted">New in the country? Find someone to practise with, and teach yours in return.</p>
          </div>
          <Link to="/partners" className="btn btn-primary">Find a partner</Link>
        </div>
      </section>

    </div>
  );
}