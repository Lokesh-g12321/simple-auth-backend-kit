
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add mobile viewport meta
if (document.querySelector('meta[name="viewport"]') === null) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

// Add mobile web app capable meta
if (document.querySelector('meta[name="apple-mobile-web-app-capable"]') === null) {
  const meta = document.createElement('meta');
  meta.name = 'apple-mobile-web-app-capable';
  meta.content = 'yes';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

// Add status bar style meta
if (document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') === null) {
  const meta = document.createElement('meta');
  meta.name = 'apple-mobile-web-app-status-bar-style';
  meta.content = 'black-translucent';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

createRoot(document.getElementById("root")!).render(<App />);
