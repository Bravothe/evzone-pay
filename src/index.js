import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './shared/styles/globals.css'; 

// Optional PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('/serviceWorker.js')
      .catch(console.error)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
