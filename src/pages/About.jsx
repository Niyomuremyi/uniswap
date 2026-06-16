import { Link } from 'react-router-dom';
import { useT } from '../lib/i18n';

const TEAM = [
  { name: 'ALLY SUHAYMA SULEIMAN', role: 'Idea & Research' },
  { name: 'HORORO DAY LOVE', role: 'Design' },
  { name: 'NIYOMUREMYI ELISSA', role: 'Development' },
];

export default function About() {
  const { t } = useT();

  const VALUES = [
    { title: t('about.val1Title'), text: t('about.val1Text') },
    { title: t('about.val2Title'), text: t('about.val2Text') },
    { title: t('about.val3Title'), text: t('about.val3Text') },
    { title: t('about.val4Title'), text: t('about.val4Text') },
  ];

  return (
    <div className="container section">
      <div className="page-head fade-up">
        <h1>{t('about.title1')} <span className="gradient-text">{t('about.title2')}</span></h1>
        <p className="muted">{t('about.sub')}</p>
      </div>

      <div className="about-2col">
        <div className="glass about-block">
          <h2>{t('about.problemA')}<span className="gradient-text">{t('about.problemB')}</span></h2>
          <p className="muted">{t('about.problemText')}</p>
        </div>
        <div className="glass about-block">
          <h2>{t('about.solutionA')}<span className="gradient-text">{t('about.solutionB')}</span></h2>
          <p className="muted">{t('about.solutionText')}</p>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: '60px' }}>
        <h2>{t('about.offersTitle1')} <span className="gradient-text">{t('about.offersTitle2')}</span></h2>
      </div>
      <div className="about-features">
        <div className="glass feature-box">
          <div className="feature-icon">B</div>
          <h3>{t('about.buyTitle')}</h3>
          <p className="muted">{t('about.buyText')}</p>
          <Link to="/browse" className="btn btn-ghost">{t('about.browseBtn')}</Link>
        </div>
        <div className="glass feature-box">
          <div className="feature-icon">L</div>
          <h3>{t('about.partnerTitle')}</h3>
          <p className="muted">{t('about.partnerText')}</p>
          <Link to="/partners" className="btn btn-ghost">{t('about.findPartner')}</Link>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: '60px' }}>
        <h2>{t('about.whyTitle1')} <span className="gradient-text">{t('about.whyTitle2')}</span></h2>
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
        <h2>{t('about.teamTitle1')} <span className="gradient-text">{t('about.teamTitle2')}</span></h2>
        <p className="muted">{t('about.teamSub')}</p>
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
            <h2>{t('about.ctaTitle1')} <span className="gradient-text">{t('about.ctaTitle2')}</span></h2>
            <p className="muted">{t('about.ctaText')}</p>
          </div>
          <Link to="/login" className="btn btn-primary">{t('about.getStarted')}</Link>
        </div>
      </section>
    </div>
  );
}