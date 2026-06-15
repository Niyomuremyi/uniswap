/* ============================================================
   UNISWAP — storage.js
   All data is saved in the browser (localStorage). No backend.
   ============================================================ */

const KEYS = {
  users:   'uniswap_users',
  session: 'uniswap_session',   // the logged-in user's id
  items:   'uniswap_items',
  partners:'uniswap_partners',
  favs:    'uniswap_favs',      // { userId: [itemId, ...] }
};

/* ---------- low-level read / write ---------- */
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- unique id ---------- */
export function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ============================ USERS ============================ */
export function getUsers() { return read(KEYS.users, []); }
export function saveUsers(users) { write(KEYS.users, users); }

export function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}
export function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

/* ============================ SESSION (login) ============================ */
export function setCurrentUser(userId) { write(KEYS.session, userId); }
export function logout() { localStorage.removeItem(KEYS.session); }

export function getCurrentUser() {
  const id = read(KEYS.session, null);
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}
export function isLoggedIn() { return !!read(KEYS.session, null); }

/* ============================ ITEMS (for sale) ============================ */
export function getItems() { return read(KEYS.items, []); }
export function saveItems(items) { write(KEYS.items, items); }

export function addItem(item) {
  const items = getItems();
  items.unshift(item);          // newest first
  saveItems(items);
}
export function getItemsByOwner(ownerId) {
  return getItems().filter(i => i.ownerId === ownerId);
}
export function deleteItem(itemId) {
  saveItems(getItems().filter(i => i.id !== itemId));
}
export function getItemById(itemId) {
  return getItems().find(i => i.id === itemId) || null;
}

/* ============================ LANGUAGE PARTNERS ============================ */
export function getPartners() { return read(KEYS.partners, []); }
export function savePartners(partners) { write(KEYS.partners, partners); }

export function addPartner(partner) {
  const partners = getPartners();
  partners.unshift(partner);
  savePartners(partners);
}
export function getPartnersByOwner(ownerId) {
  return getPartners().filter(p => p.ownerId === ownerId);
}
export function deletePartner(partnerId) {
  savePartners(getPartners().filter(p => p.id !== partnerId));
}

/* ============================ FAVOURITES ============================ */
export function getFavs(userId) {
  const all = read(KEYS.favs, {});
  return all[userId] || [];
}
export function toggleFav(userId, itemId) {
  const all = read(KEYS.favs, {});
  const list = all[userId] || [];
  const i = list.indexOf(itemId);
  if (i === -1) list.push(itemId);
  else list.splice(i, 1);
  all[userId] = list;
  write(KEYS.favs, all);
  return list.indexOf(itemId) !== -1;   // true if now a favourite
}
export function isFav(userId, itemId) {
  return getFavs(userId).includes(itemId);
}