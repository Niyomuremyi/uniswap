import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// local fonts (bundled into the app — no internet needed)
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';
import '@fontsource/outfit/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './index.css';
import App from './App.jsx';
import { seedIfEmpty } from './data/seed';
import { LanguageProvider } from './lib/i18n';

seedIfEmpty();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);