import { useState } from 'react';
import { useT } from '../lib/i18n';

export default function PartnerCard({ partner, extra }) {
  const { t } = useT();
  const [show, setShow] = useState(false);
  const digits = (partner.contact || '').replace(/[^0-9]/g, '');
  const wa = 'https://wa.me/' + digits;
  const initial = (partner.name || '?').trim().charAt(0).toUpperCase();

  return (
    <div className="partner-card glass">
      <div className="partner-head">
        <div className="partner-avatar">{initial}</div>
        <h3>{partner.name}</h3>
      </div>

      <div className="partner-langs">
        <div className="lang-badge teach">
          <span className="lang-label">{t('common.teaches')}</span>
          <span className="lang-value">{partner.teaches}</span>
        </div>
        <div className="lang-arrow">⇄</div>
        <div className="lang-badge learn">
          <span className="lang-label">{t('common.wantsToLearn')}</span>
          <span className="lang-value">{partner.learns}</span>
        </div>
      </div>

      {partner.note && <p className="partner-note muted">{partner.note}</p>}

      {show ? (
        <div className="partner-contact">
          <p>{partner.contact}</p>
          {digits && <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">{t('common.openWhatsApp')}</a>}
        </div>
      ) : (
        <button className="btn btn-primary partner-contact-btn" onClick={() => setShow(true)}>
          {t('common.connect')}
        </button>
      )}

      {extra}
    </div>
  );
}