import { FormData } from '../MultiStepFlow';
import { ChevronLeft, MapPin, Home, Clock, Building } from 'lucide-react';

export default function Step4AddressVerification({ 
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
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      <div className="lg:w-1/2 space-y-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium"
        >
          <ChevronLeft size={20} /> Back to Employment
        </button>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">Current Residence</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Specify where you currently live. This helps us ensure we can service your location.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-outline-variant/30 glass-card text-center space-y-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Serviced Cities</span>
            <p className="text-xl font-bold text-primary">500+</p>
          </div>
          <div className="p-4 rounded-xl border border-outline-variant/30 glass-card text-center space-y-2">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Agents Near You</span>
            <p className="text-xl font-bold text-primary">24/7</p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Pincode</label>
          <div className="relative group">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
            <input 
              required
              type="text"
              maxLength={6}
              value={formData.pincode}
              placeholder="110001"
              onChange={(e) => updateFormData({ pincode: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">City</label>
            <input 
              required
              type="text"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 px-4 outline-none focus:border-secondary transition-all font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">State</label>
            <input 
              required
              type="text"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 px-4 outline-none focus:border-secondary transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Flat / House No / Street</label>
          <div className="relative group">
            <Home size={18} className="absolute left-4 top-4 text-on-surface-variant group-focus-within:text-secondary" />
            <textarea 
              required
              rows={3}
              value={formData.address}
              placeholder="e.g. 102, Green Valley Apartments"
              onChange={(e) => updateFormData({ address: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary transition-all font-medium resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Residence Type</label>
          <div className="grid grid-cols-3 gap-3">
            {['Owned', 'Rented', 'Parental'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateFormData({ residenceType: type as any })}
                className={`py-3 px-2 rounded-xl border-2 transition-all text-sm font-bold ${
                  formData.residenceType === type 
                  ? 'border-secondary bg-secondary/10 text-secondary' 
                  : 'border-outline-variant text-on-surface-variant hover:border-outline'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Years at this Address</label>
            <span className="text-xl font-bold text-secondary">{formData.yearsAtAddress} Years</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="30" 
            step="1"
            value={formData.yearsAtAddress}
            onChange={(e) => updateFormData({ yearsAtAddress: Number(e.target.value) })}
            className="w-full h-2 bg-outline-variant rounded-full appearance-none cursor-pointer accent-secondary"
          />
        </div>

        <button 
          onClick={onNext}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-4"
        >
          Review Application
        </button>
      </div>
    </div>
  );
}
