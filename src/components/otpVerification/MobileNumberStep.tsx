import { useState, FormEvent } from 'react';
import type { Key } from 'react';
import { ChevronDown, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import FinMonkLogo from '../FinMonkLogo';
import { login } from '../../lib/api';

interface LoginScreenProps {
  onContinue: (phone: string) => void;
  key?: Key;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!termsAccepted || !consentAccepted) {
      setError('Please accept both checkboxes to continue.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await login(digits);
      if (result.success) {
        localStorage.setItem('finmonk_consent_given', 'true');
        onContinue(digits);
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-6">
            <FinMonkLogo size={72} className="mx-auto" />
          </div>

          <div className="text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-on-surface">
              Welcome to FinMonk
            </h1>
            <p className="text-sm text-on-surface-variant">
              Enter your mobile number to securely access your account.
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Mobile input */}
          <div className="space-y-1.5">
            <label
              htmlFor="mobile"
              className="ml-1 text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
            >
              Mobile Number
            </label>
            <div className="group relative flex items-center overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low transition-all focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary">
              {/* Country code */}
              <div className="flex h-14 items-center gap-1 border-r border-outline-variant bg-surface-container px-4 flex-shrink-0">
                <img
                  alt="India Flag"
                  className="w-5 rounded-[2px]"
                  src="https://flagcdn.com/in.svg"
                />
                <span className="text-sm font-bold text-on-surface">+91</span>
                <ChevronDown className="h-4 w-4 text-on-surface-variant" />
              </div>

              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => {
                  setError('');
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                }}
                className="h-14 w-full border-none bg-transparent px-4 text-lg tracking-[0.2em] outline-none placeholder:tracking-normal placeholder:text-outline/50"
                aria-describedby={error ? 'mobile-error' : undefined}
              />
            </div>

            {error && (
              <p id="mobile-error" className="ml-1 text-xs text-red-500 font-medium">
                {error}
              </p>
            )}
          </div>

          {/* Consent checkboxes */}
          <div className="space-y-4 pt-2">
            <label className="group flex items-start gap-4 cursor-pointer">
              <div className="mt-0.5 relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-outline-variant bg-white dark:bg-slate-800 transition-colors group-hover:border-secondary">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="peer absolute opacity-0 cursor-pointer w-full h-full"
                />
                {termsAccepted && <Check className="h-3 w-3 text-secondary" />}
              </div>
              <span className="text-xs leading-relaxed text-on-surface-variant group-hover:text-on-surface transition-colors">
                I agree to the{' '}
                <a className="font-bold text-secondary hover:underline" href="#">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a className="font-bold text-secondary hover:underline" href="#">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <label className="group flex items-start gap-4 cursor-pointer">
              <div className="mt-0.5 relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border border-outline-variant bg-white dark:bg-slate-800 transition-colors group-hover:border-secondary">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="peer absolute opacity-0 cursor-pointer w-full h-full"
                />
                {consentAccepted && <Check className="h-3 w-3 text-secondary" />}
              </div>
              <span className="text-xs leading-relaxed text-on-surface-variant group-hover:text-on-surface transition-colors">
                I provide consent for FinMonk and its{' '}
                <a className="font-bold text-secondary hover:underline" href="#">
                  NBFC Partners
                </a>{' '}
                to access my credit report.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl blue-gradient py-4 text-lg font-bold text-white shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? 'Connecting...' : 'Continue Securely'}
          </button>
        </form>

        {/* Social proof */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[11, 12].map((i) => (
              <div
                key={i}
                className="h-8 w-8 overflow-hidden rounded-full border-2 border-surface bg-surface-container-high"
              >
                <img
                  className="h-full w-full object-cover"
                  src={`https://i.pravatar.cc/100?img=${i}`}
                  alt="User avatar"
                />
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-on-surface-variant">
            Trusted by 2M+ users across India
          </p>
        </div>
      </div>

      {/* Trust badge */}
      <div className="mt-8 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-on-surface-variant/60">
          <ShieldCheck className="h-4 w-4" />
          PCI DSS Compliant &amp; ISO 27001 Certified
        </p>
      </div>
    </motion.div>
  );
}
