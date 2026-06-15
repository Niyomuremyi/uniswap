import { useState } from 'react';

const DEFAULTS = {
  Furniture:   '/images/default-furniture.jpg',
  Appliances:  '/images/default-appliances.webp',
  Electronics: '/images/default-electronics.png',
};

// match the item name to one of our real photos
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
  if (item.image) return item.image;                       // seed items have a set photo
  const title = (item.title || '').toLowerCase();
  for (const k of KEYWORD_IMAGES) {
    if (k.words.some(w => title.includes(w))) return k.src; // name matches a photo
  }
  return DEFAULTS[item.category] || DEFAULTS.Furniture;      // otherwise category default
}

export default function ItemCard({ item, isFav, onFav, extra }) {
  const [showContact, setShowContact] = useState(false);
  const imgSrc = resolveImage(item);
  const wa = 'https://wa.me/' + (item.sellerPhone || '').replace(/[^0-9]/g, '');

  return (
    <div className="item-card glass">
      <div className="item-image">
        <img className="item-photo" src={imgSrc} alt={item.title} />
        <span className="item-cat">{item.category}</span>
        {onFav && (
          <button className={'fav-btn' + (isFav ? ' active' : '')}
            onClick={() => onFav(item)} aria-label="Favourite">
            {isFav ? '♥' : '♡'}
          </button>
        )}
      </div>

      <div className="item-body">
        <div className="item-top">
          <h3>{item.title}</h3>
          <span className="item-price">¥{item.price}</span>
        </div>

        <div className="item-meta">
          <span className="chip">{item.condition}</span>
          <span className="chip">{item.campus}</span>
        </div>

        <p className="item-desc muted">{item.description}</p>

        {showContact ? (
          <div className="item-contact">
            <p>{item.sellerName} — {item.sellerPhone}</p>
            <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">Open WhatsApp</a>
          </div>
        ) : (
          <button className="btn btn-primary item-contact-btn" onClick={() => setShowContact(true)}>
            Contact seller
          </button>
        )}

        {extra}
      </div>
    </div>
  );
}