import { Link } from 'react-router-dom';

const VALUES = [
  { title: 'Save money',       text: 'Buy quality second-hand from students instead of paying full price for new.' },
  { title: 'Reduce waste',     text: 'Good items get reused instead of thrown away when students graduate.' },
  { title: 'Connect students', text: 'Trade quickly and safely with people on your own campus.' },
  { title: 'Learn together',   text: 'Find a language partner to practise with and teach your own language.' },
];

const TEAM = [
  { name: 'Team Member 1', role: 'Idea & Research' },
  { name: 'Team Member 2', role: 'Design' },
  { name: 'Team Member 3', role: 'Development' },
];

export default function About() {
  return (
    <div className="container section">
      <div className="page-head fade-up">
        <h1>About <span className="gradient-text">Uniswap</span></h1>
        <p className="muted">A student marketplace built to save money, cut waste, and bring campus together</p>
      </div>

      <div className="about-2col">
        <div className="glass about-block">
          <h2>The <span className="gradient-text">problem</span></h2>
          <p className="muted">Every year, students arrive on campus and buy everything new — mattresses, fridges, rice cookers, cupboards, and more. When they graduate, those same items are often thrown away or wasted. New students keep buying new, even though good items sit unused all around them. On top of that, international students often struggle to learn the local language because they have no one to practise with.</p>
        </div>
        <div className="glass about-block">
          <h2>Our <span className="gradient-text">solution</span></h2>
          <p className="muted">Uniswap connects students so they can buy and sell their essentials directly — quickly and mostly within the same campus. Sellers earn from things they no longer need, buyers save money, and far less goes to waste. We also help students find language partners, so learning a new language becomes part of campus life.</p>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: '60px' }}>
        <h2>What Uniswap <span className="gradient-text">offers</span></h2>
      </div>
      <div className="about-features">
        <div className="glass feature-box">
          <div className="feature-icon">B</div>
          <h3>Buy &amp; Sell</h3>
          <p className="muted">Post furniture, appliances, and electronics in seconds. Buyers contact you directly on WhatsApp. Simple, fast, and student-to-student.</p>
          <Link to="/browse" className="btn btn-ghost">Browse items</Link>
        </div>
        <div className="glass feature-box">
          <div className="feature-icon">L</div>
          <h3>Language Partners</h3>
          <p className="muted">Offer the language you speak and find someone to help you learn theirs. A friendly exchange that makes campus life easier.</p>
          <Link to="/partners" className="btn btn-ghost">Find a partner</Link>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: '60px' }}>
        <h2>Why it <span className="gradient-text">matters</span></h2>
      </div>
      <div className="grid-4">
        {VALUES.map(v => (
          <div key={v.title} className="glass value-box">
            <div className="value-icon">{v.title.charAt(0)}</div>
            <h4>{v.title}</h4>
            <p className="muted">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: '60px' }}>
        <h2>Our <span className="gradient-text">team</span></h2>
        <p className="muted">The students behind Uniswap</p>
      </div>
      <div className="grid-3">
        {TEAM.map(m => (
          <div key={m.name} className="glass team-box">
            <div className="team-avatar">{m.name.charAt(0)}</div>
            <h4>{m.name}</h4>
            <p className="muted">{m.role}</p>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="cta-banner glass">
          <div>
            <h2>Join your campus <span className="gradient-text">marketplace</span></h2>
            <p className="muted">Create an account and start swapping today.</p>
          </div>
          <Link to="/login" className="btn btn-primary">Get started</Link>
        </div>
      </section>
    </div>
  );
}