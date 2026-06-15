import { useState, useMemo } from 'react';
import { getItems, getCurrentUser, getFavs, toggleFav } from '../lib/storage';
import ItemCard from '../components/ItemCard';

const CATEGORIES = ['All', 'Furniture', 'Appliances', 'Electronics'];

export default function Browse() {
  const allItems = getItems();
  const user = getCurrentUser();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [favs, setFavs] = useState(user ? getFavs(user.id) : []);

  function handleFav(item) {
    if (!user) { alert('Please log in to save favourites.'); return; }
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
        <h1>Browse <span className="gradient-text">items</span></h1>
        <p className="muted">Find what you need from fellow students</p>
      </div>

      <div className="browse-toolbar glass">
        <input className="browse-search" placeholder="Search items..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="cat-pills">
          {CATEGORIES.map(c => (
            <button key={c} className={'pill' + (category === c ? ' active' : '')}
              onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} className="browse-sort">
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <p className="result-count muted">{items.length} item{items.length !== 1 ? 's' : ''} found</p>

      {items.length === 0 ? (
        <p className="empty-state muted">No items match your search.</p>
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