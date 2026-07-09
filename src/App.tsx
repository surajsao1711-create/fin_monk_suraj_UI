/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import MultiStepFlow from './components/MultiStepFlow';
import BusinessLoanFlow from './components/businessLoan/BusinessLoanFlow';
import CarLoanFlow from './components/carLoan/CarLoanFlow';
import { LoginScreen } from './components/otpVerification/MobileNumberStep';

// ─── Loan type selection screen ───────────────────────────────────────────────
function LoanTypeSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface dark:bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl text-center space-y-10"
      >
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            What are you applying for?
          </h1>
          <p className="text-on-surface-variant text-lg">
            Choose the loan type that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/personal-loan')}
            className="glass-card group p-8 rounded-[32px] border border-outline-variant/30 text-left hover:border-secondary hover:shadow-xl transition-all duration-300 space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-secondary">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">Personal Loan</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For individuals — home renovation, education, medical, travel, and more.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Up to ₹40L', '10.5% p.a.', '5 min approval'].map((tag) => (
                <span key={tag} className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </button>

          <button
            onClick={() => navigate('/business-loan')}
            className="glass-card group p-8 rounded-[32px] border border-outline-variant/30 text-left hover:border-secondary hover:shadow-xl transition-all duration-300 space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-secondary">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">Business Loan</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                For enterprises — working capital, expansion, equipment, and growth.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Up to ₹5Cr', '12.5% p.a.', 'NBFC backed'].map((tag) => (
                <span key={tag} className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </button>

          <button
            onClick={() => navigate('/car-loan')}
            className="glass-card group p-8 rounded-[32px] border border-outline-variant/30 text-left hover:border-secondary hover:shadow-xl transition-all duration-300 space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-secondary">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-1">Car Loan</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Loan against your car — keep driving, get funded instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Up to ₹10L', '14% p.a.', '24hr disbursal'].map((tag) => (
                <span key={tag} className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Home page: "/" → Login then Loan Select ──────────────────────────────────
function HomePage() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('finmonk_access_token'));

  const handleLogin = (phone: string) => {
    localStorage.setItem('finmonk_user_mobile', phone);
    setLoggedIn(true);
  };

  return (
    <>
      {!loggedIn ? (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface dark:bg-surface">
          <LoginScreen onContinue={handleLogin} />
        </div>
      ) : (
        <LoanTypeSelect />
      )}
    </>
  );
}

// ─── Personal Loan page ───────────────────────────────────────────────────────
function PersonalLoanPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('finmonk_access_token'));
  const [userMobile, setUserMobile] = useState(() => localStorage.getItem('finmonk_user_mobile') || '');

  const handleLogin = (phone: string) => {
    setUserMobile(phone);
    localStorage.setItem('finmonk_user_mobile', phone);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface dark:bg-surface">
        <LoginScreen onContinue={handleLogin} />
      </div>
    );
  }

  return <MultiStepFlow onExit={() => navigate('/')} userMobile={userMobile} />;
}

// ─── Business Loan page ───────────────────────────────────────────────────────
function BusinessLoanPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('finmonk_access_token'));
  const [userMobile, setUserMobile] = useState(() => localStorage.getItem('finmonk_user_mobile') || '');

  const handleLogin = (phone: string) => {
    setUserMobile(phone);
    localStorage.setItem('finmonk_user_mobile', phone);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface dark:bg-surface">
        <LoginScreen onContinue={handleLogin} />
      </div>
    );
  }

  return <BusinessLoanFlow onExit={() => navigate('/')} userMobile={userMobile} />;
}

// ─── Car Loan page ────────────────────────────────────────────────────────────
function CarLoanPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('finmonk_access_token'));

  const handleLogin = (phone: string) => {
    localStorage.setItem('finmonk_user_mobile', phone);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-surface dark:bg-surface">
        <LoginScreen onContinue={handleLogin} />
      </div>
    );
  }

  return <CarLoanFlow onExit={() => navigate('/')} />;
}

// ─── Root app with routes ─────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-surface selection:bg-secondary/20 selection:text-secondary">
      <Header onStart={() => {}} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personal-loan" element={<PersonalLoanPage />} />
          <Route path="/business-loan" element={<BusinessLoanPage />} />
          <Route path="/car-loan" element={<CarLoanPage />} />
          <Route path="/carloan" element={<CarLoanPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
