import React from 'react';
import { User, Smartphone, Mail, ShieldCheck, Car } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

interface Props {
  formData: CarLoanFormData;
  updateFormData: (data: Partial<CarLoanFormData>) => void;
  onNext: () => void;
}

export default function CLStep1PersonalInfo({ formData, updateFormData, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* ── Left panel ── */}
      <div className="lg:w-1/2 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full mb-3">
            <Car size={16} className="text-secondary" />
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Loan Against Car</span>
          </div>
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Turn your car into<br />
            <span className="text-secondary">instant cash.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Keep driving your car while you get funded. Up to ₹10 Lakhs with approval in 24 hours.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <ShieldCheck size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">Your Car Stays With You</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Unlike traditional pledging, your car remains in your possession throughout the loan tenure. Drive freely, get funded instantly.
          </p>
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '₹10L', label: 'Max Loan' },
            { value: '24 hrs', label: 'Disbursal' },
            { value: '14%', label: 'Starting Rate' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-primary">Let's get started</h2>
          <p className="text-sm text-on-surface-variant">
            Tell us a bit about yourself — takes less than 2 minutes.
          </p>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Full Name
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
              placeholder="Your full name"
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
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
              placeholder="10-digit mobile number"
              onChange={(e) => updateFormData({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Email Address <span className="normal-case font-normal">(optional)</span>
          </label>
          <div className="relative group">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              type="email"
              value={formData.email}
              placeholder="you@email.com"
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Consent */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consentCall}
              onChange={(e) => updateFormData({ consentCall: e.target.checked })}
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
              checked={formData.consentWhatsapp}
              onChange={(e) => updateFormData({ consentWhatsapp: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
            />
            <span className="text-xs text-on-surface-variant leading-relaxed">
              I also agree to be contacted on WhatsApp for faster updates. <span className="font-medium">(Optional)</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!formData.consentCall}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Check My Eligibility →
        </button>

        <p className="text-center text-xs text-on-surface-variant">
          🔒 Your information is 100% secure and never shared without consent.
        </p>
      </form>
    </div>
  );
}
