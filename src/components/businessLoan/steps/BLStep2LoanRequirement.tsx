import { ChevronLeft, Zap, TrendingUp, Info } from 'lucide-react';
import { BusinessFormData } from '../BusinessLoanFlow';

interface Props {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TENURE_OPTIONS = [12, 36, 60] as const;

function calcEmi(principal: number, tenureMonths: number): number {
  const annualRate = 0.125;
  const r = annualRate / 12;
  const n = tenureMonths;
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

export default function BLStep2LoanRequirement({ formData, updateFormData, onNext, onBack }: Props) {
  const emi = calcEmi(formData.loanAmount, formData.tenure);
  const totalRepayment = emi * formData.tenure;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* ── Left panel ── */}
      <div className="lg:w-1/2 space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Promoter Details
        </button>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            How much capital do you need?
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Customize your loan amount and tenure. Our terms are flexible to fit your business growth plan.
          </p>
        </div>

        {/* Feature card */}
        <div className="p-8 rounded-3xl bg-primary-container text-white space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="text-secondary-fixed" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Smart Repayment</h4>
              <p className="text-on-primary-container text-sm mt-1">
                Flexible EMI options with interest-only periods available for seasonal businesses.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="text-secondary-fixed" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Competitive Rates</h4>
              <p className="text-on-primary-container text-sm mt-1">
                Starting at 12.5% p.a. — matched to your business credit profile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-8 border border-outline-variant/30">

        {/* Loan amount slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
              Loan Amount
            </label>
            <span className="text-2xl font-black text-secondary">
              ₹{formData.loanAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={50000000}
            step={100000}
            value={formData.loanAmount}
            onChange={(e) => updateFormData({ loanAmount: Number(e.target.value) })}
            className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs font-medium text-on-surface-variant">
            <span>₹1 Lakh</span>
            <span>₹5 Crore</span>
          </div>
        </div>

        {/* Tenure selector */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Repayment Tenure
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TENURE_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateFormData({ tenure: t })}
                className={`py-4 rounded-xl border-2 font-bold transition-all ${
                  formData.tenure === t
                    ? 'border-secondary bg-secondary/10 text-secondary shadow-lg'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                }`}
              >
                {t} Mo
              </button>
            ))}
          </div>
        </div>

        {/* EMI summary card */}
        <div className="bg-primary-container rounded-2xl p-6 text-white space-y-4 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest mb-1">
              Estimated Monthly EMI
            </p>
            <p className="text-4xl font-bold">₹{emi.toLocaleString('en-IN')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 relative z-10">
            <div>
              <p className="text-xs text-on-primary-container opacity-70">Interest Rate</p>
              <p className="font-bold">12.5% p.a.</p>
            </div>
            <div>
              <p className="text-xs text-on-primary-container opacity-70">Total Repayment</p>
              <p className="font-bold">₹{totalRepayment.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-highest border border-outline-variant">
          <Info size={18} className="text-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Processing fee of ₹10,000 + GST applies. Final rate subject to NBFC credit assessment.
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20"
        >
          Continue to Business Details
        </button>
      </div>
    </div>
  );
}
