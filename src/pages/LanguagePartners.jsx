import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPartners, addPartner, getCurrentUser, makeId } from '../lib/storage';
import PartnerCard from '../components/PartnerCard';

export default function LanguagePartners() {
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
    if (!form.teaches.trim() || !form.learns.trim() || !form.contact.trim()) {
      setError('Please fill in what you teach, what you want to learn, and your contact.');
      return;
    }
    addPartner({
      id: makeId(),
      name: user.name,
      teaches: form.teaches.trim(),
      learns: form.learns.trim(),
      contact: form.contact.trim(),
      note: form.note.trim(),
      ownerId: user.id,
      createdAt: Date.now(),
    });
    setForm({ teaches: '', learns: '', contact: user.phone || '', note: '' });
    setShowForm(false);
    setTick(tick + 1);
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>Language <span className="gradient-text">partners</span></h1>
        <p className="muted">Find someone to practise with — and teach yours in return</p>
      </div>

      {user ? (
        <div className="partner-post">
          {!showForm ? (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Post your partner profile</button>
          ) : (
            <form className="form-card glass" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '16px' }}>Your partner profile</h3>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Language you teach</label>
                  <input value={form.teaches} onChange={e => update('teaches', e.target.value)} placeholder="e.g. English" />
                </div>
                <div className="form-group">
                  <label>Language you want to learn</label>
                  <input value={form.learns} onChange={e => update('learns', e.target.value)} placeholder="e.g. Chinese" />
                </div>
              </div>
              <div className="form-group">
                <label>Contact (phone / WhatsApp)</label>
                <input value={form.contact} onChange={e => update('contact', e.target.value)} placeholder="+86 138 0000 0000" />
              </div>
              <div className="form-group">
                <label>Short note / availability</label>
                <textarea value={form.note} onChange={e => update('note', e.target.value)} placeholder="e.g. Free evenings & weekends" rows="3"></textarea>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Post profile</button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="partner-login-hint glass">
          <p className="muted">Want to offer or find a partner? <Link to="/login" className="link-accent">Log in</Link> to post your profile.</p>
        </div>
      )}

      <div className="partner-search-wrap">
        <input className="browse-search" placeholder="Search by language or name..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <p className="result-count muted">{filtered.length} partner{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <p className="empty-state muted">No partners match your search.</p>
      ) : (
        <div className="grid-3">
          {filtered.map(p => <PartnerCard key={p.id} partner={p} />)}
        </div>
      )}
    </div>
  );
}