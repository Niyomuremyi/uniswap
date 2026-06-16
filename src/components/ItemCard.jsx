import { useState } from 'react';
import { useT } from '../lib/i18n';

const DEFAULTS = {
  Furniture:   '/images/default-furniture.jpg',
  Appliances:  '/images/default-appliances.webp',
  Electronics: '/images/default-electronics.png',
};

const KEYWORD_IMAGES = [
  { words: ['fridge', 'refrigerator'], src: '/images/fridge.webp' },
  { words: ['rice', 'cooker'],         src: '/images/rice-cooker.jpg' },
  { words: ['mattress'],               src: '/images/mattress.jpg' },
  { words: ['cupboard', 'wardrobe', 'closet'], src: '/images/cupboard.jpg' },
  { words: ['desk', 'table'],          src: '/images/desk.avif' },
  { words: ['speaker', 'bluetooth'],   src: '/images/speaker.jpg' },
  { words: ['kettle'],                 src: '/images/kettle.jpg' },
  { words: ['laptop', 'computer', 'pc'], src: '/images/laptop.jpeg' },
  { words: ['lamp', 'light'],          src: '/images/lamp.jpg' },
];

function resolveImage(item) {
  if (item.image) return item.image;
  const title = (item.title || '').toLowerCase();
  for (const k of KEYWORD_IMAGES) {
    if (k.words.some(w => title.includes(w))) return k.src;
  }
  return DEFAULTS[item.category] || DEFAULTS.Furniture;
}

export default function ItemCard({ item, isFav, onFav, extra }) {
  const { t, lang } = useT();
  const [showContact, setShowContact] = useState(false);
  const imgSrc = resolveImage(item);
  const wa = 'https://wa.me/' + (item.sellerPhone || '').replace(/[^0-9]/g, '');

  // language-aware fields (fall back to what was typed)
  const title = (lang === 'zh' && item.titleZh) ? item.titleZh : item.title;
  const desc  = (lang === 'zh' && item.descZh) ? item.descZh : item.description;
  const tData = (prefix, val) => { const k = prefix + '.' + val; const r = t(k); return r === k ? val : r; };
  const condition = tData('cond', item.condition);
  const campus = tData('campus', item.campus);

  return (
    <div className="item-card glass">
      <div className="item-image">
        <img className="item-photo" src={imgSrc} alt={title} />
        <span className="item-cat">{t('cat.' + item.category)}</span>
        {onFav && (
          <button className={'fav-btn' + (isFav ? ' active' : '')}
            onClick={() => onFav(item)} aria-label="Favourite">
            {isFav ? '♥' : '♡'}
          </button>
        )}
      </div>

      <div className="item-body">
        <div className="item-top">
          <h3>{title}</h3>
          <span className="item-price">¥{item.price}</span>
        </div>

        <div className="item-meta">
          <span className="chip">{condition}</span>
          <span className="chip">{campus}</span>
        </div>

        <p className="item-desc muted">{desc}</p>

        {showContact ? (
          <div className="item-contact">
            <p>{item.sellerName} — {item.sellerPhone}</p>
            <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">{t('common.openWhatsApp')}</a>
          </div>
        ) : (
          <button className="btn btn-primary item-contact-btn" onClick={() => setShowContact(true)}>
            {t('common.contactSeller')}
          </button>
        )}

        {extra}
      </div>
    </div>
  );
}