import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUser, getItemsByOwner, deleteItem,
  getPartnersByOwner, deletePartner,
  getFavs, toggleFav, getItemById,
} from '../lib/storage';
import ItemCard from '../components/ItemCard';
import PartnerCard from '../components/PartnerCard';
import { useT } from '../lib/i18n';

export default function Dashboard() {
  const { t } = useT();
  const user = getCurrentUser();
  const [tab, setTab] = useState('profile');
  const [tick, setTick] = useState(0);
  const refresh = () => setTick(tick + 1);

  if (!user) {
    return (
      <div className="container section">
        <div className="auth-needed glass">
          <h2>{t('dash.needLogin')}</h2>
          <p className="muted">{t('dash.needLoginText')}</p>
          <Link to="/login" className="btn btn-primary">{t('sell.loginBtn')}</Link>
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
    { key: 'profile', label: t('dash.tabProfile') },
    { key: 'items', label: `${t('dash.tabItems')} (${myItems.length})` },
    { key: 'partner', label: `${t('dash.tabPartner')} (${myPartners.length})` },
    { key: 'favs', label: `${t('dash.tabFavs')} (${favItems.length})` },
  ];

  return (
    <div className="container section">
      <div className="dash-head">
        <div className="dash-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h1>{t('dash.hi')}{user.name.split(' ')[0]} 👋</h1>
          <p className="muted">{user.campus}</p>
        </div>
      </div>

      <div className="dash-tabs">
        {tabs.map(tb => (
          <button key={tb.key} className={'pill' + (tab === tb.key ? ' active' : '')} onClick={() => setTab(tb.key)}>{tb.label}</button>
        ))}
      </div>

      {tab === 'profile' && (
        <div className="profile-grid glass">
          <div className="profile-row"><span className="muted">{t('dash.name')}</span><span>{user.name}</span></div>
          <div className="profile-row"><span className="muted">{t('dash.email')}</span><span>{user.email}</span></div>
          <div className="profile-row"><span className="muted">{t('dash.campus')}</span><span>{user.campus}</span></div>
          <div className="profile-row"><span className="muted">{t('dash.phone')}</span><span>{user.phone}</span></div>
        </div>
      )}

      {tab === 'items' && (
        myItems.length ? (
          <div className="grid-4">
            {myItems.map(item => (
              <ItemCard key={item.id} item={item}
                extra={<button className="btn btn-ghost full delete-btn" onClick={() => removeItem(item)}>{t('common.delete')}</button>} />
            ))}
          </div>
        ) : (
          <div className="empty-block glass">
            <p className="muted">{t('dash.noItems')}</p>
            <Link to="/sell" className="btn btn-primary">{t('dash.postItem')}</Link>
          </div>
        )
      )}

      {tab === 'partner' && (
        myPartners.length ? (
          <div className="grid-3">
            {myPartners.map(p => (
              <PartnerCard key={p.id} partner={p}
                extra={<button className="btn btn-ghost full delete-btn" onClick={() => removePartner(p)}>{t('common.delete')}</button>} />
            ))}
          </div>
        ) : (
          <div className="empty-block glass">
            <p className="muted">{t('dash.noPartner')}</p>
            <Link to="/partners" className="btn btn-primary">{t('dash.createPartner')}</Link>
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
            <p className="muted">{t('dash.noFavs')}</p>
            <Link to="/browse" className="btn btn-primary">{t('dash.browseItems')}</Link>
          </div>
        )
      )}
    </div>
  );
}