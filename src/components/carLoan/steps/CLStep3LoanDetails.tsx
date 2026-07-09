import React from 'react';
import { ChevronLeft, AlertTriangle, IndianRupee } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

interface Props {
  formData: CarLoanFormData;
  updateFormData: (data: Partial<CarLoanFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CAR_VALUES = ['Below ₹1.5L', '₹1.5L–3L', '₹3L–6L', '₹6L–10L', 'Above ₹10L'];
const LOAN_AMOUNTS = ['Up to ₹1L', '₹1L–3L', '₹3L–5L', '₹5L–10L', 'Above ₹10L'];
const CITIES = [
  'Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad', 'Chennai',
  'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Surat', 'Indore', 'Nagpur', 'Other',
];

// EMI calculator helper
function calculateEMI(loanAmountStr: string): number {
  const midpoints: Record<string, number> = {
    'Up to ₹1L': 75000,
    '₹1L–3L': 200000,
    '₹3L–5L': 400000,
    '₹5L–10L': 750000,
    'Above ₹10L': 1000000,
  };
  const P = midpoints[loanAmountStr] ?? 0;
  if (!P) return 0;
  const r = 16 / 1200;
  const n = 36;
  return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function loanExceedsLTV(carValue: string, loanAmount: string): boolean {
  const carMid: Record<string, number> = {
    'Below ₹1.5L': 100000,
    '₹1.5L–3L': 225000,
    '₹3L–6L': 450000,
    '₹6L–10L': 800000,
    'Above ₹10L': 1200000,
  };
  const loanMid: Record<string, number> = {
    'Up to ₹1L': 100000,
    '₹1L–3L': 200000,
    '₹3L–5L': 400000,
    '₹5L–10L': 750000,
    'Above ₹10L': 1000000,
  };
  const cv = carMid[carValue] ?? 0;
  const la = loanMid[loanAmount] ?? 0;
  if (!cv || !la) return false;
  return la > cv * 0.8;
}

export default function CLStep3LoanDetails({ formData, updateFormData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const emi = formData.loanAmount ? calculateEMI(formData.loanAmount) : 0;
  const exceedsLTV = formData.carValue && formData.loanAmount ? loanExceedsLTV(formData.carValue, formData.loanAmount) : false;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* Left panel */}
      <div className="lg:w-1/2 space-y-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            How much do you need?
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Select your car's market value and the loan amount you need. We'll show you an estimated EMI in real time.
          </p>
        </div>

        {/* EMI preview */}
        {emi > 0 && (
          <div className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl">
            <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
              Estimated EMI
            </div>
            <div className="text-3xl font-bold text-secondary">
              {formatINR(emi)}<span className="text-base font-medium text-on-surface-variant">/month*</span>
            </div>
            <div className="text-xs text-on-surface-variant mt-2">
              Based on {formData.loanAmount} over 36 months at 16% p.a. · *Subject to final approval
            </div>
          </div>
        )}

        <p className="text-xs text-on-surface-variant">
          💡 Not sure about your car's value? Check on CarDekho or OLX for a quick valuation.
        </p>
      </div>

      {/* Right panel – form */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-primary">Loan Requirements</h2>
          <p className="text-sm text-on-surface-variant">Select the values that best describe your situation.</p>
        </div>

        {/* Car Value */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Current market value of your car
          </label>
          <div className="flex flex-wrap gap-2">
            {CAR_VALUES.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => updateFormData({ carValue: v })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  formData.carValue === v
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {formData.carValue === 'Below ₹1.5L' && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Loan amount may be limited. Our team will advise the best option for you.</span>
            </div>
          )}
        </div>

        {/* Loan Amount */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            How much loan are you looking for?
          </label>
          <div className="flex flex-wrap gap-2">
            {LOAN_AMOUNTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => updateFormData({ loanAmount: v })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  formData.loanAmount === v
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {exceedsLTV && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              <span>Loan amount exceeds typical LTV limits. Our advisor will find the best possible amount for you.</span>
            </div>
          )}
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Your City
          </label>
          <select
            required
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 px-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
          >
            <option value="">Select your city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button
          type="submit"
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-2"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}
