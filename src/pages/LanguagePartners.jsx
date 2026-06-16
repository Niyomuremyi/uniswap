import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPartners, addPartner, getCurrentUser, makeId } from '../lib/storage';
import PartnerCard from '../components/PartnerCard';
import { useT } from '../lib/i18n';

export default function LanguagePartners() {
  const { t } = useT();
  const user = getCurrentUser();
  const [tick, setTick] = useState(0);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ teaches: '', learns: '', contact: user ? (user.phone || '') : '', note: '' });
  const [error, setError] = useState('');

  const partners = getPartners();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return partners.filter(p =>
      p.teaches.toLowerCase().includes(q) ||
      p.learns.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q)
    );
  }, [partners, search, tick]);

  function update(field, value) { setForm({ ...form, [field]: value }); }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.teaches.trim() || !form.learns.trim() || !form.contact.trim()) { setError(t('partners.errAll')); return; }
    addPartner({ id: makeId(), name: user.name, teaches: form.teaches.trim(), learns: form.learns.trim(), contact: form.contact.trim(), note: form.note.trim(), ownerId: user.id, createdAt: Date.now() });
    setForm({ teaches: '', learns: '', contact: user.phone || '', note: '' });
    setShowForm(false);
    setTick(tick + 1);
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{t('partners.title1')} <span className="gradient-text">{t('partners.title2')}</span></h1>
        <p className="muted">{t('partners.sub')}</p>
      </div>

      {user ? (
        <div className="partner-post">
          {!showForm ? (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>{t('partners.postBtn')}</button>
          ) : (
            <form className="form-card glass" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '16px' }}>{t('partners.formTitle')}</h3>
              <div className="form-row-2">
                <div className="form-group">
                  <label>{t('partners.teachLabel')}</label>
                  <input value={form.teaches} onChange={e => update('teaches', e.target.value)} placeholder={t('partners.teachPlaceholder')} />
                </div>
                <div className="form-group">
                  <label>{t('partners.learnLabel')}</label>
                  <input value={form.learns} onChange={e => update('learns', e.target.value)} placeholder={t('partners.learnPlaceholder')} />
                </div>
              </div>
              <div className="form-group">
                <label>{t('partners.contactLabel')}</label>
                <input value={form.contact} onChange={e => update('contact', e.target.value)} placeholder="+86 138 0000 0000" />
              </div>
              <div className="form-group">
                <label>{t('partners.noteLabel')}</label>
                <textarea value={form.note} onChange={e => update('note', e.target.value)} placeholder={t('partners.notePlaceholder')} rows="3"></textarea>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>{t('partners.cancel')}</button>
                <button type="submit" className="btn btn-primary">{t('partners.postProfile')}</button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="partner-login-hint glass">
          <p className="muted">{t('partners.loginHintPre')}<Link to="/login" className="link-accent">{t('partners.loginHintLink')}</Link>{t('partners.loginHintPost')}</p>
        </div>
      )}

      <div className="partner-search-wrap">
        <input className="browse-search" placeholder={t('partners.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <p className="result-count muted">{filtered.length} {t('partners.found')}</p>

      {filtered.length === 0 ? (
        <p className="empty-state muted">{t('partners.noResults')}</p>
      ) : (
        <div className="grid-3">
          {filtered.map(p => <PartnerCard key={p.id} partner={p} />)}
        </div>
      )}
    </div>
  );
}