import { Sun, Moon } from 'lucide-react';
import FinMonkLogo from './FinMonkLogo';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onStart?: () => void;
}

export default function Header({ onStart }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-surface/70 dark:bg-surface/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 dark:border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center w-full px-4 md:px-12 max-w-7xl mx-auto py-3">

        {/* Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.location.href = '/'}
          role="link"
          aria-label="FinMonk home"
        >
          <FinMonkLogo size={40} />
          <span className="text-2xl font-bold tracking-tight text-primary dark:text-white">
            FinMonk
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <a
            className="text-sm font-medium text-on-surface-variant dark:text-slate-300 hover:text-secondary dark:hover:text-blue-400 transition-colors"
            href="#"
          >
            Check Eligibility
          </a>
          <a
            className="text-sm font-medium text-on-surface-variant dark:text-slate-300 hover:text-secondary dark:hover:text-blue-400 transition-colors"
            href="#"
          >
            Tools
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-600 hover:text-secondary dark:hover:text-blue-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          {/* Get Started */}
          <button
            onClick={onStart}
            className="gradient-button text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
