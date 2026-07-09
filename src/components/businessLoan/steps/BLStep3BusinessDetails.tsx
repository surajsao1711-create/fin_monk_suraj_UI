import React from 'react';
import { ChevronLeft, Building2, Hash, BarChart2, Briefcase, Info } from 'lucide-react';
import { BusinessFormData } from '../BusinessLoanFlow';

interface Props {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const INDUSTRY_OPTIONS = [
  'Technology Services',
  'Manufacturing',
  'Retail & E-Commerce',
  'Healthcare',
  'Construction',
  'Food & Beverage',
  'Education',
  'Others',
];

export default function BLStep3BusinessDetails({ formData, updateFormData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* ── Left panel ── */}
      <div className="lg:w-1/2 space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Loan Requirement
        </button>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Tell us about your business.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Your business profile helps us match you with the right NBFC partner and secure the best rate.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <Info size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">Why we need this?</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            GSTIN and turnover data are used to verify your business's financial health and determine your eligible loan limit.
          </p>
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        {/* Legal entity name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Legal Entity Name
          </label>
          <div className="relative group">
            <Building2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="text"
              value={formData.businessName}
              placeholder="Quantum Solutions Pvt. Ltd."
              onChange={(e) => updateFormData({ businessName: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Industry type */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Industry Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {INDUSTRY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateFormData({ industry: option })}
                className={`flex items-center gap-2 py-3 px-4 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                  formData.industry === option
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                }`}
              >
                <Briefcase size={14} className="shrink-0" />
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* GSTIN */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            GSTIN
          </label>
          <div className="relative group">
            <Hash
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="text"
              maxLength={15}
              value={formData.gstin}
              placeholder="27AAACQ1234F1Z5"
              onChange={(e) => updateFormData({ gstin: e.target.value.toUpperCase() })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium uppercase"
            />
          </div>
        </div>

        {/* Annual turnover */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Annual Turnover
          </label>
          <div className="relative group">
            <BarChart2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="text"
              value={formData.turnover}
              placeholder="e.g. ₹2,45,00,000"
              onChange={(e) => updateFormData({ turnover: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-2"
        >
          Continue to Address
        </button>
      </form>
    </div>
  );
}
