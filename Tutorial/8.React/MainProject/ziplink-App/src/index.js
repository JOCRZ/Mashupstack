// ─── Imports ─────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';
// Client-side routing — enables URL-based navigation without page reload
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ─── Render App into DOM ─────────────────────────────────
// React 18 createRoot API — replaces legacy ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode: development-only wrapper that double-invokes renders
  // to detect side effects and potential bugs
  <React.StrictMode>
    {/* BrowserRouter: provides routing context to entire app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
