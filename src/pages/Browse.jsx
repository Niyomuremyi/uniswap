import { useState, useMemo } from 'react';
import { getItems, getCurrentUser, getFavs, toggleFav } from '../lib/storage';
import ItemCard from '../components/ItemCard';
import { useT } from '../lib/i18n';

const CATEGORIES = ['All', 'Furniture', 'Appliances', 'Electronics'];

export default function Browse() {
  const { t } = useT();
  const allItems = getItems();
  const user = getCurrentUser();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [favs, setFavs] = useState(user ? getFavs(user.id) : []);

  function handleFav(item) {
    if (!user) { alert(t('browse.loginFav')); return; }
    toggleFav(user.id, item.id);
    setFavs(getFavs(user.id));
  }

  const items = useMemo(() => {
    let list = allItems.filter(i =>
      (category === 'All' || i.category === category) &&
      (i.title.toLowerCase().includes(search.toLowerCase()) ||
       i.description.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [allItems, search, category, sort]);

  return (
    <div className="container section">
      <div className="page-head">
        <h1>{t('browse.title1')} <span className="gradient-text">{t('browse.title2')}</span></h1>
        <p className="muted">{t('browse.sub')}</p>
      </div>

      <div className="browse-toolbar glass">
        <input className="browse-search" placeholder={t('browse.searchPlaceholder')}
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="cat-pills">
          {CATEGORIES.map(c => (
            <button key={c} className={'pill' + (category === c ? ' active' : '')}
              onClick={() => setCategory(c)}>{t('cat.' + c)}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="browse-sort">
          <option value="newest">{t('browse.sortNewest')}</option>
          <option value="price-low">{t('browse.sortLow')}</option>
          <option value="price-high">{t('browse.sortHigh')}</option>
        </select>
      </div>

      <p className="result-count muted">{items.length} {t('browse.itemsFound')}</p>

      {items.length === 0 ? (
        <p className="empty-state muted">{t('browse.noResults')}</p>
      ) : (
        <div className="grid-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item}
              isFav={favs.includes(item.id)} onFav={handleFav} />
          ))}
        </div>
      )}
    </div>
  );
}