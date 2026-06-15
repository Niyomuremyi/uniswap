import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, addItem, makeId } from '../lib/storage';

const CATEGORIES = ['Furniture', 'Appliances', 'Electronics'];
const CONDITIONS = ['Like new', 'Good', 'Fair'];

export default function SellItem() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', category: 'Furniture', price: '', condition: 'Good', campus: '', description: '',
  });
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="container section">
        <div className="auth-needed glass">
          <h2>Please <span className="gradient-text">log in</span> to sell</h2>
          <p className="muted">You need an account to post an item for sale.</p>
          <Link to="/login" className="btn btn-primary">Login / Register</Link>
        </div>
      </div>
    );
  }

  function update(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.campus.trim() || !form.description.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (Number(form.price) <= 0) {
      setError('Please enter a valid price.');
      return;
    }
    addItem({
      id: makeId(),
      title: form.title.trim(),
      category: form.category,
      price: Number(form.price),
      condition: form.condition,
      campus: form.campus.trim(),
      description: form.description.trim(),
      sellerName: user.name,
      sellerPhone: user.phone,
      ownerId: user.id,
      image: null,
      createdAt: Date.now(),
    });
    navigate('/dashboard');
  }

  return (
    <div className="container section">
      <div className="page-head">
        <h1>Sell an <span className="gradient-text">item</span></h1>
        <p className="muted">Post something you no longer need</p>
      </div>

      <form className="form-card glass" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item name</label>
          <input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Mini Fridge" />
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={e => update('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Condition</label>
            <select value={form.condition} onChange={e => update('condition', e.target.value)}>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Price (¥)</label>
            <input type="number" value={form.price} onChange={e => update('price', e.target.value)} placeholder="e.g. 150" />
          </div>
          <div className="form-group">
            <label>Campus</label>
            <input value={form.campus} onChange={e => update('campus', e.target.value)} placeholder="e.g. Main Campus" />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={form.description} onChange={e => update('description', e.target.value)}
            placeholder="Describe the item, its condition, etc." rows="4"></textarea>
        </div>

        <p className="muted note-small">Buyers will contact you on: <strong>{user.phone || 'your phone'}</strong> (from your account)</p>

        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn btn-primary full">Post item</button>
      </form>
    </div>
  );
}