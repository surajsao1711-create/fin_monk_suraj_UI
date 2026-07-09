import React, { useState } from 'react';
import { User, Smartphone, Calendar, CreditCard, Mail, ShieldCheck } from 'lucide-react';
import { BusinessFormData } from '../BusinessLoanFlow';

interface Props {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
}

export default function BLStep1PromoterInfo({ formData, updateFormData, onNext }: Props) {
  const [consentCall, setConsentCall] = useState(false);
  const [consentWhatsapp, setConsentWhatsapp] = useState(false);
  const needsConsent = !localStorage.getItem('finmonk_consent_given');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needsConsent && !consentCall) return;
    if (needsConsent) {
      localStorage.setItem('finmonk_consent_given', 'true');
    }
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* ── Left panel ── */}
      <div className="lg:w-1/2 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Empower your business growth.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Access professional financing tailored to your company's unique trajectory. Secure, fast, and built for modern entrepreneurs.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <ShieldCheck size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">RBI Regulated Platform</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Your PAN and mobile number are used solely for identity verification and credit assessment with our NBFC partners.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3">
          {['ISO 27001', 'PCI-DSS', 'RBI Regulated'].map((badge) => (
            <span
              key={badge}
              className="text-xs font-bold text-on-surface-variant border border-outline-variant px-3 py-1.5 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-primary">Promoter Information</h2>
          <p className="text-sm text-on-surface-variant">
            Tell us about the primary business owner.
          </p>
        </div>

        {/* Mobile */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Mobile Number
          </label>
          <div className="relative group">
            <Smartphone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobile}
              placeholder="98765 43210"
              onChange={(e) => updateFormData({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Full name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Full Name (as per PAN)
          </label>
          <div className="relative group">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="text"
              value={formData.fullName}
              placeholder="Aditya Vikram Singh"
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* PAN + DOB */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
              PAN Number
            </label>
            <div className="relative group">
              <CreditCard
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
              />
              <input
                required
                type="text"
                maxLength={10}
                value={formData.pan}
                placeholder="ABCDE1234F"
                onChange={(e) => updateFormData({ pan: e.target.value.toUpperCase() })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
              Date of Birth
            </label>
            <div className="relative group">
              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
              />
              <input
                required
                type="date"
                value={formData.dob}
                onChange={(e) => updateFormData({ dob: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Email Address
          </label>
          <div className="relative group">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="email"
              value={formData.email}
              placeholder="name@business.com"
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Consent — shown only when user came directly (skipped login page) */}
        {needsConsent && (
          <div className="space-y-3 pt-2 border-t border-outline-variant/30">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentCall}
                onChange={(e) => setConsentCall(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I agree to be contacted by FinMonk and its lending partners via phone and SMS regarding my loan application.
                <span className="text-secondary font-medium"> (Required)</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentWhatsapp}
                onChange={(e) => setConsentWhatsapp(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I also agree to be contacted on WhatsApp for faster updates. <span className="font-medium">(Optional)</span>
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={needsConsent && !consentCall}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Verify &amp; Continue
        </button>

        <p className="text-center text-xs text-on-surface-variant">
          By continuing, you agree to our{' '}
          <a className="text-secondary underline" href="#">
            Terms &amp; Privacy Policy
          </a>
        </p>
      </form>
    </div>
  );
}
