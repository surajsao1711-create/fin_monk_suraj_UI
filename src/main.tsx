import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { initPostHog } from './lib/posthog.ts';
import './index.css';

/**
 * Apply saved theme class synchronously before React hydrates to prevent
 * a flash of the wrong theme on first load.
 */
(function applyInitialTheme() {
  const saved = localStorage.getItem('finmonk-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

// Initialize PostHog analytics
initPostHog();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
