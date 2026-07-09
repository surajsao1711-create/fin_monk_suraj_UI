import { FormData } from '../MultiStepFlow';
import { ChevronLeft, Zap, Info } from 'lucide-react';

export default function Step2LoanDetails({ 
  formData, 
  updateFormData, 
  onNext,
  onBack
}: { 
  formData: FormData; 
  updateFormData: (data: Partial<FormData>) => void; 
  onNext: () => void;
  onBack: () => void;
}) {
  const purposes = ['Home Renovation', 'Education', 'Medical Emergency', 'Wedding', 'Debt Consolidation', 'Business Start', 'Travel', 'Others'];

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      <div className="lg:w-1/2 space-y-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline font-medium"
        >
          <ChevronLeft size={20} /> Back to Profile
        </button>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">How much capital do you need?</h1>
          <p className="text-on-surface-variant text-lg">
            Customize your loan amount and tenure. Our terms are flexible to fit your lifestyle.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-primary-container text-white space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Zap className="text-secondary-fixed" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Smart Repayment</h4>
              <p className="text-on-primary-container text-sm">Flexible EMI options starting from interest-only periods.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-8 border border-outline-variant/30">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Loan Amount</label>
            <span className="text-2xl font-black text-secondary">₹{formData.loanAmount.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="50000" 
            max="4000000" 
            step="50000"
            value={formData.loanAmount}
            onChange={(e) => updateFormData({ loanAmount: Number(e.target.value) })}
            className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-secondary"
          />
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Repayment Tenure</label>
          <div className="grid grid-cols-3 gap-3">
            {[12, 24, 36, 48, 60, 72].map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => updateFormData({ loanTenure: months })}
                className={`py-3 px-4 rounded-xl border-2 transition-all font-bold ${
                  formData.loanTenure === months 
                  ? 'border-secondary bg-secondary/10 text-secondary' 
                  : 'border-outline-variant text-on-surface-variant hover:border-outline'
                }`}
              >
                {months}M
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Purpose of Loan</label>
          <div className="grid grid-cols-2 gap-3">
            {purposes.map((purpose) => (
              <button
                key={purpose}
                type="button"
                onClick={() => updateFormData({ loanPurpose: purpose })}
                className={`py-3 px-4 rounded-xl border-2 transition-all text-sm font-semibold text-left ${
                  formData.loanPurpose === purpose 
                  ? 'border-secondary bg-secondary/10 text-secondary' 
                  : 'border-outline-variant text-on-surface-variant hover:border-outline'
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-4"
        >
          Check Offers
        </button>
      </div>
    </div>
  );
}
