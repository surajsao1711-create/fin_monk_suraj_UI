import React from 'react';
import { ChevronLeft, Briefcase, Building2, UserCheck, PauseCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

interface Props {
  formData: CarLoanFormData;
  updateFormData: (data: Partial<CarLoanFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EMPLOYMENT_OPTIONS = [
  { key: 'salaried', icon: <Briefcase size={20} className="text-secondary" />, label: 'Salaried', sub: 'Private / Govt' },
  { key: 'business', icon: <Building2 size={20} className="text-secondary" />, label: 'Business Owner', sub: '' },
  { key: 'selfemployed', icon: <UserCheck size={20} className="text-secondary" />, label: 'Self-employed / Freelancer', sub: '' },
  { key: 'unemployed', icon: <PauseCircle size={20} className="text-secondary" />, label: 'Not currently working', sub: '' },
];

const INCOME_OPTIONS = ['Below ₹15K', '₹15K–30K', '₹30K–60K', 'Above ₹60K'];

export default function CLStep4Employment({ formData, updateFormData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* Left panel */}
      <div className="lg:w-1/2 space-y-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Almost there!
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Your employment and income help lenders assess your eligibility. All employment types are welcome — we have NBFC partners for every profile.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-3">
          <h4 className="font-bold text-sm text-secondary uppercase tracking-widest">Why we ask this</h4>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Income verification is a key factor in loan approval. The more accurate your response, the better we can match you with the right lender offering the best terms.
          </p>
        </div>
      </div>

      {/* Right panel – form */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-primary">Employment & Income</h2>
          <p className="text-sm text-on-surface-variant">Tell us about your current occupation.</p>
        </div>

        {/* Employment type */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Current Occupation
          </label>
          <div className="grid grid-cols-2 gap-3">
            {EMPLOYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => updateFormData({ employmentType: opt.key })}
                className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${
                  formData.employmentType === opt.key
                    ? 'border-secondary bg-secondary/5 shadow-md'
                    : 'border-outline-variant hover:border-secondary/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    {opt.icon}
                  </div>
                  {formData.employmentType === opt.key && <CheckCircle size={16} className="text-secondary" />}
                </div>
                <div className="font-semibold text-primary text-sm">{opt.label}</div>
                {opt.sub && <div className="text-xs text-on-surface-variant">{opt.sub}</div>}
              </button>
            ))}
          </div>
          {formData.employmentType === 'unemployed' && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Income verification may be required. Our team will explore options.</span>
            </div>
          )}
        </div>

        {/* Monthly income */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Monthly Income / Business Revenue
          </label>
          <div className="flex flex-wrap gap-2">
            {INCOME_OPTIONS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => updateFormData({ monthlyIncome: v })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  formData.monthlyIncome === v
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {formData.monthlyIncome === 'Below ₹15K' && (
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200">
              ℹ️ You may still qualify with some of our NBFC partners.
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-2"
        >
          Review Application →
        </button>
      </form>
    </div>
  );
}
