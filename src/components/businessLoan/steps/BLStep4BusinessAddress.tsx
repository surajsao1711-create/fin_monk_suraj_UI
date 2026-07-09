import { ChevronLeft, MapPin, Building2, Navigation, Info } from 'lucide-react';
import { BusinessFormData } from '../BusinessLoanFlow';

interface Props {
  formData: BusinessFormData;
  updateFormData: (data: Partial<BusinessFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const OWNERSHIP_OPTIONS: Array<BusinessFormData['ownership']> = ['Owned', 'Rented'];

export default function BLStep4BusinessAddress({ formData, updateFormData, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      {/* ── Left panel ── */}
      <div className="lg:w-1/2 space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Business Details
        </button>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Where is your business located?
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            A verified business address strengthens your credit profile and speeds up approval.
          </p>
        </div>

        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <Info size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">Trust Signal</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Businesses with a verified registered address receive up to 15% better interest rates from our NBFC partners.
          </p>
        </div>

        {/* Years at address visual */}
        <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Years at Current Address
            </label>
            <span className="text-2xl font-black text-secondary">{formData.yearsAtAddress} yrs</span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={formData.yearsAtAddress}
            onChange={(e) => updateFormData({ yearsAtAddress: Number(e.target.value) })}
            className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-secondary"
          />
          <div className="flex justify-between text-xs font-medium text-on-surface-variant">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20+</span>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30">

        {/* Pincode + Locality */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
              Pincode
            </label>
            <div className="relative group">
              <Navigation
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
              />
              <input
                required
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={formData.pincode}
                placeholder="400001"
                onChange={(e) => updateFormData({ pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
              Locality / City
            </label>
            <div className="relative group">
              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
              />
              <input
                required
                type="text"
                value={formData.locality}
                placeholder="Bandra East, Mumbai"
                onChange={(e) => updateFormData({ locality: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* State (auto-filled) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            State
          </label>
          <div className="relative group">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors"
            />
            <input
              type="text"
              value={formData.state}
              placeholder="Auto-filled from pincode"
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Street address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Building / Street Address
          </label>
          <div className="relative group">
            <Building2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors"
            />
            <input
              required
              type="text"
              value={formData.address}
              placeholder="Suite 402, Trade Center"
              onChange={(e) => updateFormData({ address: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        {/* Office ownership */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
            Office Ownership
          </label>
          <div className="grid grid-cols-2 gap-3">
            {OWNERSHIP_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateFormData({ ownership: option })}
                className={`py-4 rounded-xl border-2 font-bold transition-all ${
                  formData.ownership === option
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-on-surface-variant opacity-70">
          Information shared is encrypted and used only for loan processing.
        </p>

        <button
          onClick={onNext}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20"
        >
          Save &amp; Continue to Review
        </button>
      </div>
    </div>
  );
}
