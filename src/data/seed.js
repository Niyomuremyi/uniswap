/* ============================================================
   UNISWAP — seed.js
   Sample items + partners, loaded once so the site isn't empty.
   ============================================================ */

import { getItems, saveItems, getPartners, savePartners } from '../lib/storage';

/* ---------- sample items for sale (prices in Chinese Yuan ¥) ---------- */
export const SEED_ITEMS = [
  { id: 's-fridge',  title: 'Mini Fridge',       category: 'Appliances', price: 350, condition: 'Good',     campus: 'Main Campus', description: 'Compact fridge, perfect for a dorm. Works great, cleaned and ready.', sellerName: 'Wei Chen',     sellerPhone: '+86 138 0000 1111', ownerId: 'seed', image: null, createdAt: Date.now() - 100000 },
  { id: 's-cooker',  title: 'Rice Cooker',       category: 'Appliances', price: 80,  condition: 'Like new', campus: 'Main Campus', description: 'Used for one semester. 1.8L, cooks rice perfectly.',                  sellerName: 'Sara Johnson', sellerPhone: '+86 138 0000 2222', ownerId: 'seed', image: null, createdAt: Date.now() - 200000 },
  { id: 's-mattress',title: 'Single Mattress',   category: 'Furniture',  price: 150, condition: 'Good',     campus: 'East Campus', description: 'Clean single mattress, no stains. Comfortable and firm.',              sellerName: 'Ahmed Ali',    sellerPhone: '+86 138 0000 3333', ownerId: 'seed', image: null, createdAt: Date.now() - 300000 },
  { id: 's-cupboard',title: 'Wooden Cupboard',   category: 'Furniture',  price: 200, condition: 'Fair',     campus: 'East Campus', description: 'Sturdy wooden cupboard with two doors. Some small marks.',             sellerName: 'Li Mei',       sellerPhone: '+86 138 0000 4444', ownerId: 'seed', image: null, createdAt: Date.now() - 400000 },
  { id: 's-desk',    title: 'Study Desk',        category: 'Furniture',  price: 120, condition: 'Good',     campus: 'Main Campus', description: 'Spacious study desk. Great for laptop and books.',                     sellerName: 'David Kim',    sellerPhone: '+86 138 0000 5555', ownerId: 'seed', image: null, createdAt: Date.now() - 500000 },
  { id: 's-speaker', title: 'Bluetooth Speaker', category: 'Electronics',price: 180, condition: 'Like new', campus: 'South Campus',description: 'Loud, clear sound. Great battery life. Barely used.',                 sellerName: 'Wei Chen',     sellerPhone: '+86 138 0000 1111', ownerId: 'seed', image: null, createdAt: Date.now() - 600000 },
  { id: 's-kettle',  title: 'Electric Kettle',   category: 'Appliances', price: 45,  condition: 'Good',     campus: 'South Campus',description: 'Fast-boiling 1.7L kettle. Auto switch-off.',                          sellerName: 'Sara Johnson', sellerPhone: '+86 138 0000 2222', ownerId: 'seed', image: null, createdAt: Date.now() - 700000 },
  { id: 's-laptop',  title: 'Used Laptop',       category: 'Electronics',price: 1500,condition: 'Good',     campus: 'Main Campus', description: 'Reliable laptop for study. 8GB RAM, fast SSD. Charger included.',      sellerName: 'Ahmed Ali',    sellerPhone: '+86 138 0000 3333', ownerId: 'seed', image: null, createdAt: Date.now() - 800000 },
  { id: 's-lamp',    title: 'Desk Lamp',         category: 'Electronics',price: 30,  condition: 'Like new', campus: 'East Campus', description: 'Adjustable LED desk lamp with warm/cool light.',                       sellerName: 'Li Mei',       sellerPhone: '+86 138 0000 4444', ownerId: 'seed', image: null, createdAt: Date.now() - 900000 },
];

/* ---------- sample language partners ---------- */
export const SEED_PARTNERS = [
  { id: 'p-wei',   name: 'Wei Chen',     teaches: 'Chinese', learns: 'English', contact: '+86 138 0000 1111', note: 'Free evenings & weekends. Happy to help with daily Chinese.', ownerId: 'seed', createdAt: Date.now() - 100000 },
  { id: 'p-sara',  name: 'Sara Johnson', teaches: 'English', learns: 'Chinese', contact: '+86 138 0000 2222', note: 'Native English speaker. Looking to practise Chinese in exchange.', ownerId: 'seed', createdAt: Date.now() - 200000 },
  { id: 'p-ahmed', name: 'Ahmed Ali',    teaches: 'Arabic',  learns: 'Chinese', contact: '+86 138 0000 3333', note: 'Can teach Arabic basics. Weekday afternoons.', ownerId: 'seed', createdAt: Date.now() - 300000 },
  { id: 'p-limei', name: 'Li Mei',       teaches: 'Chinese', learns: 'French',  contact: '+86 138 0000 4444', note: 'Patient tutor. Lets meet at the library or online.', ownerId: 'seed', createdAt: Date.now() - 400000 },
  { id: 'p-david', name: 'David Kim',    teaches: 'Korean',  learns: 'Chinese', contact: '+86 138 0000 5555', note: 'K-drama fan? Lets learn together. Flexible times.', ownerId: 'seed', createdAt: Date.now() - 500000 },
];

/* ---------- load the samples once (only if storage is empty) ---------- */
export function seedIfEmpty() {
  if (getItems().length === 0) saveItems(SEED_ITEMS);
  if (getPartners().length === 0) savePartners(SEED_PARTNERS);
}