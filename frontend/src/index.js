// src/index.js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import i18n from './i18n';                        
import { I18nextProvider } from 'react-i18next';   

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading…</div>}>
    <I18nextProvider i18n={i18n}>               
      <App />
    </I18nextProvider>
  </Suspense>
);
