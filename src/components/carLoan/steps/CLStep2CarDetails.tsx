import React from 'react';
import { ChevronLeft, Car, Key, ShoppingCart, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

interface Props {
  formData: CarLoanFormData;
  updateFormData: (data: Partial<CarLoanFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRODUCTS = [
  { key: 'LAC', icon: <Key size={22} className="text-secondary" />, title: 'Loan Against My Car', sub: 'I already own a car' },
  { key: 'UCL', icon: <ShoppingCart size={22} className="text-secondary" />, title: 'Used Car Loan', sub: 'I want to buy a used car' },
  { key: 'NCL', icon: <Sparkles size={22} className="text-secondary" />, title: 'New Car Loan', sub: 'I want to buy a new car' },
];

const RC_OPTIONS = [
  { key: 'self', label: 'Yes, RC is in my name' },
  { key: 'family', label: "It's in a family member's name" },
  { key: 'active_loan', label: 'Loan is still running on this car' },
];

const CAR_BRANDS = [
  'Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Toyota',
  'Mahindra', 'Kia', 'MG', 'Renault', 'Volkswagen',
  'Ford', 'Skoda', 'Nissan', 'Other',
];

const CAR_YEARS = [
  '2022 or newer',
  '2019 – 2021',
  '2016 – 2018',
  '2013 – 2015',
  '2010 – 2012',
  'Before 2010',
];

export default function CLStep2CarDetails({ formData, updateFormData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const isLAC = formData.product === 'LAC';

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* Left panel */}
      <div className="lg:w-1/2 space-y-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Tell us about your car
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            This helps us match you with the right lender and give you an instant eligibility estimate.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-3">
          <div className="flex items-center gap-3 text-secondary">
            <Car size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">Quick Tip</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Cars registered in your name with fewer than 10 years of age get the best loan terms. Our team will help explore options regardless.
          </p>
        </div>
      </div>

      {/* Right panel – form */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-primary">Car Information</h2>
          <p className="text-sm text-on-surface-variant">Select your loan type and car details.</p>
        </div>

        {/* Product selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            What are you looking for?
          </label>
          <div className="space-y-3">
            {PRODUCTS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => updateFormData({ product: p.key as CarLoanFormData['product'] })}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                  formData.product === p.key
                    ? 'border-secondary bg-secondary/5 shadow-md'
                    : 'border-outline-variant hover:border-secondary/50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-primary text-sm">{p.title}</div>
                  <div className="text-xs text-on-surface-variant">{p.sub}</div>
                </div>
                {formData.product === p.key && <CheckCircle size={18} className="text-secondary flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Non-LAC message */}
        {(formData.product === 'UCL' || formData.product === 'NCL') && (
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
            ℹ️ You're looking for a car purchase loan — we'll route you correctly. Click Continue to proceed.
          </div>
        )}

        {/* LAC-specific fields */}
        {isLAC && (
          <>
            {/* RC Ownership */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                Is the car registered in your name?
              </label>
              <div className="space-y-2">
                {RC_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => updateFormData({ rcOwnership: opt.key as CarLoanFormData['rcOwnership'] })}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left text-sm ${
                      formData.rcOwnership === opt.key
                        ? 'border-secondary bg-secondary/5'
                        : 'border-outline-variant hover:border-secondary/50'
                    }`}
                  >
                    <span className="font-medium text-primary">{opt.label}</span>
                    {formData.rcOwnership === opt.key && <CheckCircle size={16} className="text-secondary" />}
                  </button>
                ))}
              </div>
              {formData.rcOwnership === 'family' && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                  <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Most lenders require RC in your name. Our team will help you explore options.</span>
                </div>
              )}
              {formData.rcOwnership === 'active_loan' && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-200">
                  ℹ️ We have NBFC partners who offer top-up loans. You still may be eligible.
                </div>
              )}
            </div>

            {/* Car brand + year */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  Car Brand
                </label>
                <select
                  required
                  value={formData.carBrand}
                  onChange={(e) => updateFormData({ carBrand: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 px-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
                >
                  <option value="">Select brand</option>
                  {CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                  Year
                </label>
                <select
                  required
                  value={formData.carYear}
                  onChange={(e) => updateFormData({ carYear: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 px-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
                >
                  <option value="">Select year</option>
                  {CAR_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            {formData.carYear === 'Before 2010' && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                <span>Cars older than 2012 may have limited lender options. We'll still try.</span>
              </div>
            )}
          </>
        )}

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
