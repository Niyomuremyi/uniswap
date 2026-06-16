import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, addItem, makeId } from '../lib/storage';
import { useT } from '../lib/i18n';

const CATEGORIES = ['Furniture', 'Appliances', 'Electronics'];
const CONDITIONS = ['Like new', 'Good', 'Fair'];

export default function SellItem() {
  const { t } = useT();
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', category: 'Furniture', price: '', condition: 'Good', campus: '', description: '' });
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="container section">
        <div className="auth-needed glass">
          <h2>{t('sell.needPre')}<span className="gradient-text">{t('sell.needMid')}</span>{t('sell.needPost')}</h2>
          <p className="muted">{t('sell.needText')}</p>
          <Link to="/login" className="btn btn-primary">{t('sell.loginBtn')}</Link>
        </div>
      </div>
    );
  }

  function update(field, value) { setForm({ ...form, [field]: value }); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.campus.trim() || !form.description.trim()) {
      setError(t('sell.errAll')); return;
    }
    if (Number(form.price) <= 0) { setError(t('sell.errPrice')); return; }
    addItem({
      id: makeId(), title: form.title.trim(), category: form.category,
      price: Number(form.price), condition: form.condition, campus: form.campus.trim(),
      description: form.description.trim(), sellerName: user.name, sellerPhone: user.phone,
      ownerId: user.id, image: null, createdAt: Date.now(),
    });
    navigate('/dashboard');
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{t('sell.title1')} <span className="gradient-text">{t('sell.title2')}</span></h1>
        <p className="muted">{t('sell.sub')}</p>
      </div>

      <form className="form-card glass" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('sell.itemName')}</label>
          <input value={form.title} onChange={e => update('title', e.target.value)} placeholder={t('sell.namePlaceholder')} />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>{t('sell.category')}</label>
            <select value={form.category} onChange={e => update('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{t('cat.' + c)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>{t('sell.condition')}</label>
            <select value={form.condition} onChange={e => update('condition', e.target.value)}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>{t('sell.price')}</label>
            <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder={t('sell.pricePlaceholder')} />
          </div>
          <div className="form-group">
            <label>{t('sell.campus')}</label>
            <input value={form.campus} onChange={e => update('campus', e.target.value)} placeholder={t('sell.campusPlaceholder')} />
          </div>
        </div>

        <div className="form-group">
          <label>{t('sell.description')}</label>
          <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder={t('sell.descPlaceholder')} rows="4"></textarea>
        </div>

        <p className="muted note-small">{t('sell.contactNote')} <strong>{user.phone || ''}</strong> {t('sell.fromAccount')}</p>

        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn btn-primary full">{t('sell.post')}</button>
      </form>
    </div>
  );
}