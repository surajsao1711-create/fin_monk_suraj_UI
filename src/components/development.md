/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  // Step 1: Promoter
  mobile: string;
  fullName: string;
  pan: string;
  dob: string;
  email: string;
  // Step 2: Loan
  loanAmount: number;
  tenure: number;
  // Step 3: Business
  businessName: string;
  industry: string;
  gstin: string;
  turnover: string;
  // Step 4: Address
  pincode: string;
  locality: string;
  state: string;
  ownership: 'Owned' | 'Rented';
  address: string;
  yearsAtAddress: number;
}

// --- Components ---

const Header = () => (
  <header className="bg-surface/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] sticky top-0 z-50">
    <div className="flex justify-between items-center w-full px-margin-mobile md:px-lg max-w-max-width mx-auto py-sm">
      <div className="text-2xl font-bold tracking-tight text-primary">
        FinMonk
      </div>
      <nav className="hidden md:flex items-center gap-md">
        <a className="text-on-surface-variant hover:text-primary font-medium text-sm transition-all" href="#">Check Eligibility</a>
        <a className="text-on-surface-variant hover:text-primary font-medium text-sm transition-all" href="#">Tools</a>
      </nav>
      <button className="gradient-button text-on-primary px-md py-xs rounded-full font-medium text-sm hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95">
        Get Started
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-surface-container-lowest border-t border-outline-variant mt-xl">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md w-full px-margin-mobile md:px-lg py-lg max-w-max-width mx-auto">
      <div className="flex flex-col gap-sm">
        <div className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">FinMonk</div>
        <p className="text-sm text-on-surface-variant">© 2024 FinMonk. RBI Regulated NBFC Partner Platform.</p>
      </div>
      <div className="flex flex-col gap-sm">
        <div className="text-sm font-bold">Resources</div>
        <nav className="flex flex-col gap-xs">
          <a className="text-on-surface-variant hover:text-secondary text-sm transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-secondary text-sm transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
        </nav>
      </div>
      <div className="flex flex-col gap-sm">
        <div className="text-sm font-bold">Compliance</div>
        <nav className="flex flex-col gap-xs">
          <a className="text-on-surface-variant hover:text-secondary text-sm transition-colors opacity-80 hover:opacity-100" href="#">RBI Disclaimer</a>
          <a className="text-on-surface-variant hover:text-secondary text-sm transition-colors opacity-80 hover:opacity-100" href="#">NBFC Partners</a>
        </nav>
      </div>
      <div className="flex flex-col gap-sm">
        <div className="text-sm font-bold">Security</div>
        <div className="flex gap-sm items-center">
          <div className="h-10 w-24 bg-surface-container-high rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-outline">verified</span>
          </div>
          <div className="h-10 w-24 bg-surface-container-high rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-outline">shield</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    mobile: '',
    fullName: '',
    pan: '',
    dob: '',
    email: '',
    loanAmount: 2500000,
    tenure: 36,
    businessName: 'Quantum Solutions Private Limited',
    industry: 'Technology Services & Consulting',
    gstin: '27AAACQ1234F1Z5',
    turnover: '₹2,45,00,000',
    pincode: '',
    locality: 'Bandra East, Mumbai',
    state: 'Maharashtra',
    ownership: 'Owned',
    address: '',
    yearsAtAddress: 5,
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep(prev => (prev < 5 ? (prev + 1) as Step : prev));
  const prevStep = () => setStep(prev => (prev > 1 ? (prev - 1) as Step : prev));

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-secondary/20">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Progress Bar (Sticky below header on mobile) */}
        <div className="w-full max-w-max-width mx-auto px-margin-mobile md:px-lg pt-lg">
          <div className="max-w-xl mx-auto w-full mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-on-surface-variant">
                Step {step} of 5: {step === 1 ? 'Promoter Details' : step === 2 ? 'Loan Requirement' : step === 3 ? 'Business Details' : step === 4 ? 'Business Address' : 'Review & Submit'}
              </span>
              <span className="text-sm font-bold text-secondary">{progress}% completed</span>
            </div>
            <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-secondary-container rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow flex items-stretch overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Step1 
                  data={formData} 
                  update={updateFormData} 
                  onNext={nextStep} 
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Step2 
                  data={formData} 
                  update={updateFormData} 
                  onNext={nextStep} 
                  onBack={prevStep}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Step3 
                  data={formData} 
                  update={updateFormData} 
                  onNext={nextStep} 
                  onBack={prevStep}
                />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Step4 
                  data={formData} 
                  update={updateFormData} 
                  onNext={nextStep} 
                  onBack={prevStep}
                />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <Step5 
                  data={formData} 
                  onBack={prevStep}
                  onEdit={(s) => setStep(s as Step)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// --- Step Components ---

const Step1 = ({ data, update, onNext }: { data: FormData, update: (d: Partial<FormData>) => void, onNext: () => void }) => {
  return (
    <div className="w-full max-w-max-width mx-auto flex flex-col md:flex-row h-full">
      <section className="relative w-full md:w-1/2 min-h-[400px] flex items-center justify-center p-lg overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCATmtJ1-Re1G9dI3nBa3NxHEK1k0PC8gcwi1kkRU2Ym_ypcNLaj9d93l176Hb6tzwyBdyyxUzA3VC2V--08s4MAW_PzMBJQckqWK-UM_J2DD0qhulLtcN1jhZNE5hpWsvZhnXCKkZo9qZ1RtrNBzut8xbFWw1LRTNmj7unwScabcSyz2N2WitPHBUjDwGJ1L-xXH9R379jXBY-zLSDIz87_WYLl0IOYr3IAfkIevCu1nUVSCz8M0DKr4OJRv1nUN4YONl5eGPqvXw" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/90 to-transparent"></div>
        </div>
        <div className="relative z-10 text-on-tertiary max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Empower your business growth.</h1>
          <p className="text-lg opacity-80 mb-8">Access professional financing tailored to your company's unique trajectory. Secure, fast, and built for modern entrepreneurs.</p>
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg bg-secondary-container/20 backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-secondary fill-1">verified_user</span>
            </div>
            <span className="text-sm font-medium">RBI Regulated NBFC Partner Platform</span>
          </div>
        </div>
      </section>

      <section className="w-full md:w-1/2 p-margin-mobile md:p-lg flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Promoter Information</h2>
            <p className="text-on-surface-variant">Tell us about the primary business owner to begin your application.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            <div className="group">
              <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Mobile Number</label>
              <input 
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all placeholder:text-outline-variant/50" 
                placeholder="+91 00000 00000" 
                type="tel"
                value={data.mobile}
                onChange={(e) => update({ mobile: e.target.value })}
                required
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Full Name (as per PAN)</label>
              <input 
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all placeholder:text-outline-variant/50" 
                placeholder="John Doe" 
                type="text"
                value={data.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-gutter">
              <div className="group">
                <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">PAN Number</label>
                <input 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all placeholder:text-outline-variant/50 uppercase" 
                  placeholder="ABCDE1234F" 
                  type="text"
                  value={data.pan}
                  onChange={(e) => update({ pan: e.target.value.toUpperCase() })}
                  required
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Date of Birth</label>
                <input 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all" 
                  type="date"
                  value={data.dob}
                  onChange={(e) => update({ dob: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Email Address</label>
              <input 
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all placeholder:text-outline-variant/50" 
                placeholder="name@business.com" 
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                required
              />
            </div>
            <div className="pt-8">
              <button className="w-full gradient-button text-on-primary py-4 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-on-surface-variant mt-4">
                By continuing, you agree to our <a className="text-secondary underline" href="#">Terms & Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const Step2 = ({ data, update, onNext, onBack }: { data: FormData, update: (d: Partial<FormData>) => void, onNext: () => void, onBack: () => void }) => {
  const emi = Math.round((data.loanAmount * 0.125) / 12); // Mock calculation
  
  return (
    <div className="w-full max-w-max-width mx-auto px-margin-mobile md:px-lg py-lg flex flex-col gap-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold leading-tight">Powering your Enterprise Growth</h1>
            <p className="text-lg text-on-surface-variant max-w-md">Customize your capital needs to scale your business operations with India's fastest regulated lending platform.</p>
          </div>
          <div className="aspect-square relative overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center">
            <img 
              className="object-cover w-full h-full mix-blend-multiply opacity-90" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMC1pYJ8RWoL2danZAC3oZBHnwW_-zYmcSiuKfS6wW3NanVXhJEr0eH1HzfAFkykNvyy8bkgWDXVQDrXEymcBVU7CbpGRasf6P_Xu_TJAO0t0GJ-X4Y7v_FW8wvZnLWVD9DjYp0vNp1sB2pHFo2KFGMLxoOqRDQ19xPVH1JtWSpvEwlfDPBgsDN7wQoWYBP3K1l4LmRb1CuqoZPbm_I-GrWbGbrHH5GCX3gcHTuBOrpZFw4LI20GuJphYTrnaa-Uoz-OjSC7ZcGO8" 
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <section className="glass-card p-6 md:p-8 rounded-xl shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <label className="text-2xl font-bold text-on-surface">Loan Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                <input 
                  className="w-full md:w-64 bg-surface-container-lowest border-none pl-8 pr-4 py-2 text-2xl font-bold text-secondary rounded-lg text-right" 
                  type="text" 
                  value={data.loanAmount.toLocaleString('en-IN')}
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-4 py-4">
              <input 
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary" 
                max="50000000" 
                min="100000" 
                step="100000"
                type="range" 
                value={data.loanAmount}
                onChange={(e) => update({ loanAmount: parseInt(e.target.value) })}
              />
              <div className="flex justify-between text-xs font-medium text-on-surface-variant">
                <span>₹1 Lakh</span>
                <span>₹5 Crore</span>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 md:p-8 rounded-xl shadow-sm space-y-6">
            <h3 className="text-2xl font-bold text-on-surface">Tenure (Months)</h3>
            <div className="grid grid-cols-3 gap-4">
              {[12, 36, 60].map(t => (
                <button 
                  key={t}
                  onClick={() => update({ tenure: t })}
                  className={`py-4 px-2 rounded-xl border-2 transition-all font-bold ${
                    data.tenure === t ? 'border-secondary bg-secondary/5 text-secondary shadow-lg' : 'border-outline-variant hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {t} Months
                </button>
              ))}
            </div>
          </section>

          <section className="bg-primary-container text-on-primary-container p-6 md:p-8 rounded-xl shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <p className="text-sm opacity-70">Estimated Monthly EMI</p>
                <h2 className="text-5xl font-bold text-on-primary">₹{emi.toLocaleString('en-IN')}</h2>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-sm fill-0">verified</span>
                  RBI Regulated Partners
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8 relative z-10">
              <div className="space-y-1">
                <p className="text-xs opacity-60">Interest Rate</p>
                <p className="text-xl font-bold text-on-primary">12.5% <span className="text-xs font-normal opacity-50">p.a</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-xs opacity-60">Processing Fee</p>
                <p className="text-xl font-bold text-on-primary">₹10,000 <span className="text-xs font-normal opacity-50">+GST</span></p>
              </div>
              <div className="col-span-2 md:col-span-1 space-y-1">
                <p className="text-xs opacity-60">Total Repayment</p>
                <p className="text-xl font-bold text-on-primary">₹{(emi * data.tenure).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </section>

          <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <button 
              onClick={onBack}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-medium text-on-surface-variant hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous Step
            </button>
            <button 
              onClick={onNext}
              className="w-full md:w-80 bg-secondary text-on-secondary py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-4"
            >
              Continue to Business Details
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ data, update, onNext, onBack }: { data: FormData, update: (d: Partial<FormData>) => void, onNext: () => void, onBack: () => void }) => {
  return (
    <div className="w-full max-w-md mx-auto p-margin-mobile flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Business Details</h2>
        <p className="text-on-surface-variant">We need a few more details about your company.</p>
      </div>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        <div className="group">
          <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Legal Entity Name</label>
          <input 
            className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all" 
            value={data.businessName}
            onChange={(e) => update({ businessName: e.target.value })}
            required
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Industry Type</label>
          <input 
            className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all" 
            value={data.industry}
            onChange={(e) => update({ industry: e.target.value })}
            required
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">GSTIN</label>
          <input 
            className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all" 
            value={data.gstin}
            onChange={(e) => update({ gstin: e.target.value })}
            required
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-on-surface-variant mb-1 group-focus-within:text-secondary transition-colors">Annual Turnover</label>
          <input 
            className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-3 text-lg transition-all" 
            value={data.turnover}
            onChange={(e) => update({ turnover: e.target.value })}
            required
          />
        </div>
        <div className="pt-8 flex gap-4">
          <button onClick={onBack} type="button" className="flex-1 py-4 border-2 border-outline-variant rounded-xl font-bold transition-all">Back</button>
          <button className="flex-[2] gradient-button text-on-primary py-4 rounded-xl font-bold shadow-lg transition-all" type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

const Step4 = ({ data, update, onNext, onBack }: { data: FormData, update: (d: Partial<FormData>) => void, onNext: () => void, onBack: () => void }) => {
  return (
    <div className="w-full max-w-max-width mx-auto px-margin-mobile md:px-lg py-lg flex flex-col lg:grid lg:grid-cols-12 gap-lg lg:items-start">
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video lg:aspect-[1/1.2]">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkitoTm9iyZF_Bzlhf3txpsiPy9Ers6GgdlbTvDLnnadG7rsYKTsjmc7KttHXsHHMmX7ZCjqEqDwd6B76n-YXOLxABidSDJJDnTGH3-_HYWMqNf8JguPUhGFOwMXSEnrfQX268fMDy33yWC-OXszZFQDj1VYXUw_SSiOq7sN7XQ8xRLuGRPLmp4ANR8cpSynSXfW6lwxY21UH9e-H-e482bnHWQExr0-k1CzRHDDaG9veX53-hRzytJmAHHH1zgqzJ5Y85f_ijPcs" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <div className="flex items-center gap-2 text-on-primary mb-2">
              <span className="material-symbols-outlined text-secondary-fixed">verified</span>
              <span className="text-xs uppercase tracking-widest opacity-80">Trust Signal</span>
            </div>
            <h2 className="text-2xl font-bold text-on-primary leading-tight">A verified business address strengthens your credit profile.</h2>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-8">
        <div className="glass-card rounded-xl p-6 md:p-8 flex flex-col gap-6 shadow-sm border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">Pincode</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 text-lg transition-colors placeholder:text-outline-variant/50" 
                  placeholder="e.g. 400001" 
                  type="text"
                  value={data.pincode}
                  onChange={(e) => update({ pincode: e.target.value })}
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-secondary text-xs font-bold hover:underline">
                  <span className="material-symbols-outlined text-sm">my_location</span>
                  Detect
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">Locality / City</label>
              <input 
                className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 text-lg" 
                type="text" 
                value={data.locality}
                onChange={(e) => update({ locality: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">State</label>
              <input 
                className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant px-2 py-2 text-lg text-on-surface-variant cursor-not-allowed" 
                readOnly 
                type="text" 
                value={data.state}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant">Office Ownership</label>
              <div className="flex gap-4 pt-1">
                {['Owned', 'Rented'].map(o => (
                  <button 
                    key={o}
                    onClick={() => update({ ownership: o as any })}
                    className={`flex-1 py-2 border-2 rounded-lg text-sm font-bold transition-all ${
                      data.ownership === o ? 'border-secondary bg-secondary/5 text-secondary' : 'border-outline-variant'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface-variant">Building Name / Street Address</label>
            <input 
              className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 px-0 py-2 text-lg transition-colors placeholder:text-outline-variant/50" 
              placeholder="Suite 402, Trade Center" 
              type="text"
              value={data.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-on-surface-variant">Years at current address</label>
              <span className="text-2xl font-bold text-secondary">{data.yearsAtAddress} Years</span>
            </div>
            <div className="relative">
              <input 
                className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-secondary" 
                max="20" 
                min="0" 
                type="range" 
                value={data.yearsAtAddress}
                onChange={(e) => update({ yearsAtAddress: parseInt(e.target.value) })}
              />
              <div className="flex justify-between mt-2 text-xs text-on-surface-variant opacity-60">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20+</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onBack}
              className="flex-1 py-4 rounded-xl border-2 border-outline-variant font-bold hover:border-secondary transition-all"
            >
              Back
            </button>
            <button 
              onClick={onNext}
              className="flex-[2] py-4 bg-secondary text-on-secondary rounded-xl font-bold hover:scale-[1.02] shadow-xl transition-all"
            >
              Save & Continue
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-on-surface-variant opacity-60">
          Information shared is encrypted and used only for loan processing.
        </p>
      </div>
    </div>
  );
};

const Step5 = ({ data, onBack, onEdit }: { data: FormData, onBack: () => void, onEdit: (s: number) => void }) => {
  const emi = Math.round((data.loanAmount * 0.125) / 12);

  return (
    <div className="w-full max-w-max-width mx-auto px-margin-mobile md:px-lg py-lg">
      <div className="mb-12">
        <span className="text-sm text-secondary font-bold uppercase tracking-widest">Final Step</span>
        <h1 className="text-5xl font-bold mt-2 text-primary">Review & Submit</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-8 space-y-6">
          <section className="glass-card rounded-xl p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">domain</span>
                <h2 className="text-2xl font-bold">Business Summary</h2>
              </div>
              <button 
                onClick={() => onEdit(3)}
                className="flex items-center gap-1 text-secondary text-sm font-bold hover:underline"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Legal Entity Name</p>
                <p className="text-lg font-bold">{data.businessName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Industry Type</p>
                <p className="text-lg font-bold">{data.industry}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Annual Turnover</p>
                <p className="text-lg font-bold">{data.turnover}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">GSTIN</p>
                <p className="text-lg font-bold">{data.gstin}</p>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-xl p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">person</span>
                <h2 className="text-2xl font-bold">Promoter Summary</h2>
              </div>
              <button 
                onClick={() => onEdit(1)}
                className="flex items-center gap-1 text-secondary text-sm font-bold hover:underline"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Primary Applicant</p>
                <p className="text-lg font-bold">{data.fullName || 'Aditya Vikram Singh'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">PAN Number</p>
                <p className="text-lg font-bold">{data.pan.replace(/.(?=.{4})/g, 'X')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Contact</p>
                <p className="text-lg font-bold">{data.mobile || '+91 98765 43210'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-on-surface-variant">Email</p>
                <p className="text-lg font-bold">{data.email || 'name@business.com'}</p>
              </div>
            </div>
          </section>

          <section className="p-4 space-y-6">
            <h3 className="text-2xl font-bold">Authorizations & Consent</h3>
            <div className="space-y-4">
              {[
                "I hereby authorize FinMonk to pull my credit report from authorized bureaus (CIBIL, Experian) to assess loan eligibility.",
                "I agree to the Terms & Conditions and Privacy Policy of the platform.",
                "I consent to sharing my business and personal data with registered NBFC partners for the purpose of loan processing."
              ].map((text, i) => (
                <label key={i} className="flex gap-4 cursor-pointer group">
                  <input className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" required />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{text}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-primary-container text-on-primary-container rounded-xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] material-symbols-outlined opacity-10">account_balance</div>
            <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 relative z-10">Loan Summary</h3>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="opacity-80">Requested Amount</span>
                <span className="text-xl font-bold">₹{data.loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">Interest Rate (p.a.)</span>
                <span className="font-bold">12.5% Fixed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">Tenure</span>
                <span className="font-bold">{data.tenure} Months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-80">Processing Fee</span>
                <span className="font-bold">₹10,000 + GST</span>
              </div>
              <div className="pt-6 border-t border-dashed border-white/20">
                <p className="text-xs uppercase opacity-70">Estimated EMI</p>
                <div className="flex justify-between items-end">
                  <p className="text-4xl font-bold text-on-secondary-container">₹{emi.toLocaleString('en-IN')}</p>
                  <span className="material-symbols-outlined mb-1">info</span>
                </div>
              </div>
              <button 
                className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold mt-4 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 group"
                onClick={() => alert('Application Submitted Successfully!')}
              >
                Submit Application
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
              </button>
              <p className="text-center text-xs opacity-60">Final approval subject to NBFC verification</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 opacity-60 text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            SSL Secured & RBI Regulated Ecosystem
          </div>
        </aside>
      </div>

      <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Instant Verification', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgR3ukCI6SM6pgHbEl2-6UnzMy1dcfM1oxn29-5aIlar_4Kl0hrhiQbREq-QMtBm9B1-HAi5T6P_mYHyTieaqY2YEgTdm_KyKeRCtMrCf9nnW-aS-kCbfLBT61KfQn8TwN5duaEePuKVlbK_nW8zFuzdXwL985aGNK5dj7m8N6YNE95_Ygbh0VAIl4lBKOPRvQrjKwCYZZfLfQZqzgRFLvlOndg1BHHUK1ZomkCMxZeZdSjEjCaD-oFNAUDEhGl70na7MMCGjkLsU' },
          { title: 'NBFC Network', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrwXbOPtNsIAyDWsL6s3qnYRFCuqkArbOam5E0kUDv-TN5BJRYQafPeyZEwRm9au5Erk9f0nCIrsb97tWhRRlOO9u0F3EmcDCQ04F0GArtQlcmbRmDWFfnYZNz0m9bBImPed73nj826pDQzbjB_LkvpJlS3SZOg6SUjCTo8VtbGYtC8MybYYO4BHdRA93YX4HbF_WhMYVgBxxrg0nLml_7HEG7QJjBiyyFhJ4Qc0UgRc6kZ0ER2F9ucyVpfUKn8PTbsBJEk7c4hW4' },
          { title: 'Data Security', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSwWcTedMuOdOBLOUKQYcO2HDGkyWlz69GYJ75n6kCi2O1wGO10-0B9Igab0LID-dfhX2bUcylUDryW_i67dvYoMCS57Q8NvX8Drg_F6HcbLGBWVZNzbAy6cOamHb4tq5HLWZvoD9MDkXPq-1jo561444Jj_E50GgDVxDOcPKMJEVsMj4a3ju_R0Jev2_-SvG6OZfOW3mDsVa3lvsOwuvS5QP3totYaXYUcOiB8hVF-8Dy8pvFFU9-EcHd537guVHN3vpfLcbyCcM' }
        ].map((item, i) => (
          <div key={i} className="relative h-48 rounded-xl overflow-hidden group">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <p className="text-white font-bold tracking-widest uppercase text-xs">{item.title}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
