import { Share2, Globe, Mail, Phone } from 'lucide-react';
import FinMonkLogo from './FinMonkLogo';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-surface-container-low border-t border-outline-variant dark:border-outline-variant/40 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full px-4 md:px-12 py-12 max-w-7xl mx-auto">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FinMonkLogo size={32} />
            <span className="text-sm font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-300">
              FinMonk
            </span>
          </div>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed">
            FinMonk is a digital lending platform empowering individuals and businesses with smart financial tools.
          </p>
          <div className="flex gap-4 text-secondary dark:text-blue-400">
            <Share2 size={20} className="cursor-pointer hover:scale-110 transition-transform" aria-label="Share" />
            <Globe size={20} className="cursor-pointer hover:scale-110 transition-transform" aria-label="Website" />
          </div>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-primary dark:text-white uppercase tracking-widest">
            Products
          </h4>
          <ul className="space-y-3">
            {['Personal Loans', 'Business Loans', 'Credit Score Check'].map((item) => (
              <li key={item}>
                <a
                  className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-secondary dark:hover:text-blue-400 transition-colors"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-primary dark:text-white uppercase tracking-widest">
            Legal
          </h4>
          <ul className="space-y-3">
            {['Privacy Policy', 'Terms of Service', 'RBI Disclaimer'].map((item) => (
              <li key={item}>
                <a
                  className="text-sm text-on-surface-variant dark:text-slate-400 hover:text-secondary dark:hover:text-blue-400 transition-colors"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-primary dark:text-white uppercase tracking-widest">
            Support
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-on-surface-variant dark:text-slate-400">
              <Mail size={16} aria-hidden="true" /> support@finmonk.com
            </li>
            <li className="flex items-center gap-2 text-sm text-on-surface-variant dark:text-slate-400">
              <Phone size={16} aria-hidden="true" /> 1800-FIN-MONK
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 border-t border-outline-variant/30 dark:border-outline-variant/20 text-center">
        <p className="text-sm text-on-surface-variant dark:text-slate-500">
          © 2024 FinMonk. RBI Regulated NBFC Partner Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
