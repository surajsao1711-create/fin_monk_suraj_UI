import { motion } from 'motion/react';
import { ShieldCheck, Zap, FileText, Eye, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import type { Key } from 'react';
import FinMonkLogo from './FinMonkLogo';

export default function LandingPage({ onStart }: { onStart: () => void; key?: Key }) {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const r = 10.5 / (12 * 100);
    const n = tenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
  };

  const emi = calculateEMI();
  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - loanAmount;

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden bg-surface dark:bg-surface">
        {/* Ambient blobs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-block"
          >
            <FinMonkLogo size={80} className="mx-auto drop-shadow-xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-primary dark:text-white mb-6 tracking-tight leading-[1.1]"
          >
            Instant Loans.<br />
            <span className="text-secondary dark:text-blue-400">Zero Hassle.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto mb-10"
          >
            Experience the next generation of digital lending. Fast approvals with a simple,
            secure, and fully digital process designed for your financial freedom.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA — always blue gradient, always visible */}
            <button
              onClick={onStart}
              className="w-full md:w-auto gradient-button text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              Get Started
            </button>

            {/* Secondary CTA — outlined, dark-aware */}
            <button className="w-full md:w-auto bg-transparent text-primary dark:text-white border-2 border-outline-variant dark:border-slate-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-surface-container dark:hover:bg-slate-800 hover:border-secondary dark:hover:border-blue-400 transition-all">
              Check Eligibility
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-12 opacity-60"
          >
            <span className="font-medium text-sm flex items-center gap-2 text-on-surface dark:text-slate-300">
              <ShieldCheck size={18} className="text-secondary dark:text-blue-400" /> RBI Regulated
            </span>
            <span className="font-medium text-sm flex items-center gap-2 text-on-surface dark:text-slate-300">
              <ShieldCheck size={18} className="text-secondary dark:text-blue-400" /> 256-bit SSL
            </span>
            <span className="font-medium text-sm flex items-center gap-2 text-on-surface dark:text-slate-300">
              <Zap size={18} className="text-secondary dark:text-blue-400" /> 5 Min Approval
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-24 bg-surface-container-lowest dark:bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">
              Why Choose FinMonk?
            </h2>
            <p className="text-on-surface-variant dark:text-slate-400">
              Banking grade security meets startup-speed approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Fast Approval */}
            <div className="md:col-span-7 relative group overflow-hidden rounded-2xl glass-card p-10 flex flex-col justify-end shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/30 dark:border-white/5">
              <div className="absolute top-0 right-0 p-10">
                <Zap size={64} className="text-secondary opacity-10 group-hover:opacity-20 transition-opacity" />
              </div>
              <div className="relative z-10">
                <span className="text-secondary dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 block">
                  Experience
                </span>
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Fast Approval</h3>
                <p className="text-on-surface-variant dark:text-slate-400 max-w-md">
                  Our AI-driven credit engine analyzes your profile in real-time, providing loan
                  offers in under 5 minutes without physical visits.
                </p>
              </div>
            </div>

            {/* Secure Process */}
            <div className="md:col-span-5 rounded-2xl bg-primary-container p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Secure Process</h3>
                <p className="text-on-primary-container">
                  Your data is encrypted with military-grade standards. We never share information
                  without your explicit consent.
                </p>
              </div>
            </div>

            {/* Minimal Docs */}
            <div className="md:col-span-5 rounded-2xl border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-surface-container p-10 hover:border-secondary dark:hover:border-blue-400 transition-colors duration-300">
              <FileText className="text-secondary dark:text-blue-400 mb-6" size={32} />
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
                Minimal Documentation
              </h3>
              <p className="text-on-surface-variant dark:text-slate-400">
                Paperless application using e-KYC. Just your PAN and Aadhar are all you need to
                get started.
              </p>
            </div>

            {/* Transparent Terms */}
            <div className="md:col-span-7 rounded-2xl bg-secondary-fixed/20 dark:bg-secondary-fixed/10 p-10 flex items-center gap-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
                  Transparent Terms
                </h3>
                <p className="text-on-surface-variant dark:text-slate-400">
                  No hidden charges or surprise fees. What you see is exactly what you get, every time.
                </p>
              </div>
              <div className="hidden sm:block">
                <Eye size={80} className="text-secondary dark:text-blue-400 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMI Calculator ── */}
      <section className="py-24 bg-surface dark:bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-primary dark:text-white mb-6 leading-tight">
                Plan your finances with precision.
              </h2>
              <p className="text-lg text-on-surface-variant dark:text-slate-400 mb-10">
                Use our smart EMI calculator to visualize your repayment schedule before you commit.
              </p>

              <div className="space-y-10 glass-card p-10 rounded-2xl shadow-lg border border-outline-variant/30 dark:border-white/5">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
                      Loan Amount
                    </label>
                    <span className="text-2xl font-bold text-secondary dark:text-blue-400">
                      ₹{loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="4000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-outline-variant dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant dark:text-slate-500 font-medium">
                    <span>₹50K</span>
                    <span>₹40L</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
                      Tenure (Years)
                    </label>
                    <span className="text-2xl font-bold text-secondary dark:text-blue-400">
                      {tenure} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 bg-outline-variant dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-xs text-on-surface-variant dark:text-slate-500 font-medium">
                    <span>1 Year</span>
                    <span>10 Years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-primary-container rounded-[32px] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                  <LayoutDashboard size={200} />
                </div>
                <div className="relative z-10 space-y-10">
                  <div>
                    <p className="text-xs font-bold text-on-primary-container uppercase tracking-[0.2em] mb-2">
                      Estimated Monthly EMI
                    </p>
                    <p className="text-5xl font-bold">₹{Math.round(emi).toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                    <div>
                      <p className="text-xs font-bold text-on-primary-container uppercase tracking-wider mb-2">
                        Total Interest
                      </p>
                      <p className="text-2xl font-bold">₹{Math.round(totalInterest).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-primary-container uppercase tracking-wider mb-2">
                        Total Payable
                      </p>
                      <p className="text-2xl font-bold">₹{Math.round(totalPayable).toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={onStart}
                    className="w-full bg-secondary text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20"
                  >
                    Apply for this Amount
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-16 border-y border-outline-variant/30 dark:border-slate-800 bg-surface dark:bg-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <p className="text-xs font-bold text-on-surface-variant dark:text-slate-500 uppercase tracking-[0.3em] mb-12">
            Our NBFC Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 dark:opacity-20 grayscale contrast-125">
            <div className="text-2xl font-black italic tracking-tighter text-on-surface dark:text-white">BANKAXIS</div>
            <div className="text-2xl font-black italic tracking-tighter text-on-surface dark:text-white">HDFC-DIRECT</div>
            <div className="text-2xl font-black italic tracking-tighter text-on-surface dark:text-white">ICICI-LEND</div>
            <div className="text-2xl font-black italic tracking-tighter text-on-surface dark:text-white">KOTAK-FIN</div>
          </div>
        </div>
      </section>
    </div>
  );
}
