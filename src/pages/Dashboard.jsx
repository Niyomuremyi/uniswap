import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUser, getItemsByOwner, deleteItem,
  getPartnersByOwner, deletePartner,
  getFavs, toggleFav, getItemById,
} from '../lib/storage';
import ItemCard from '../components/ItemCard';
import PartnerCard from '../components/PartnerCard';

export default function Dashboard() {
  const user = getCurrentUser();
  const [tab, setTab] = useState('profile');
  const [tick, setTick] = useState(0);          // used to refresh after changes
  const refresh = () => setTick(tick + 1);

  if (!user) {
    return (
      <div className="container section">
        <div className="auth-needed glass">
          <h2>Please <span className="gradient-text">log in</span></h2>
          <p className="muted">Log in to see your dashboard.</p>
          <Link to="/login" className="btn btn-primary">Login / Register</Link>
        </div>
      </div>
    );
  }

  const myItems = getItemsByOwner(user.id);
  const myPartners = getPartnersByOwner(user.id);
  const favItems = getFavs(user.id).map(getItemById).filter(Boolean);

  function removeItem(item) { deleteItem(item.id); refresh(); }
  function removePartner(p) { deletePartner(p.id); refresh(); }
  function unfav(item) { toggleFav(user.id, item.id); refresh(); }

  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'items', label: `My Items (${myItems.length})` },
    { key: 'partner', label: `Partner Profile (${myPartners.length})` },
    { key: 'favs', label: `Favourites (${favItems.length})` },
  ];

  return (
    <div className="container section">
      <div className="dash-head">
        <div className="dash-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h1>Hi, {user.name.split(' ')[0]} 👋</h1>
          <p className="muted">{user.campus}</p>
        </div>
      </div>

      <div className="dash-tabs">
        {tabs.map(t => (
          <button key={t.key} className={'pill' + (tab === t.key ? ' active' : '')} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="profile-grid glass">
          <div className="profile-row"><span className="muted">Name</span><span>{user.name}</span></div>
          <div className="profile-row"><span className="muted">Email</span><span>{user.email}</span></div>
          <div className="profile-row"><span className="muted">University / Campus</span><span>{user.campus}</span></div>
          <div className="profile-row"><span className="muted">Phone / WhatsApp</span><span>{user.phone}</span></div>
        </div>
      )}

      {tab === 'items' && (
        myItems.length ? (
          <div className="grid-4">
            {myItems.map(item => (
              <ItemCard key={item.id} item={item}
                extra={<button className="btn btn-ghost full delete-btn" onClick={() => removeItem(item)}>Delete</button>} />
            ))}
          </div>
        ) : (
          <div className="empty-block glass">
            <p className="muted">You haven't posted any items yet.</p>
            <Link to="/sell" className="btn btn-primary">Post an item</Link>
          </div>
        )
      )}

      {tab === 'partner' && (
        myPartners.length ? (
          <div className="grid-3">
            {myPartners.map(p => (
              <PartnerCard key={p.id} partner={p}
                extra={<button className="btn btn-ghost full delete-btn" onClick={() => removePartner(p)}>Delete</button>} />
            ))}
          </div>
        ) : (
          <div className="empty-block glass">
            <p className="muted">You haven't created a language-partner profile yet.</p>
            <Link to="/partners" className="btn btn-primary">Create one</Link>
          </div>
        )
      )}

      {tab === 'favs' && (
        favItems.length ? (
          <div className="grid-4">
            {favItems.map(item => (
              <ItemCard key={item.id} item={item} isFav={true} onFav={unfav} />
            ))}
          </div>
        ) : (
          <div className="empty-block glass">
            <p className="muted">No favourites yet. Tap the heart on any item to save it.</p>
            <Link to="/browse" className="btn btn-primary">Browse items</Link>
          </div>
        )
      )}
    </div>
  );
}