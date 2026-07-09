import React from 'react';
import { FormData } from '../MultiStepFlow';
import { User, Smartphone, Calendar, CreditCard, Mail, Info } from 'lucide-react';

export default function Step1PersonalInfo({ 
  formData, 
  updateFormData, 
  onNext 
}: { 
  formData: FormData; 
  updateFormData: (data: Partial<FormData>) => void; 
  onNext: () => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
      <div className="lg:w-1/2 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">Let's get to know you.</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Fill in your basic details to start your custom loan application process.
          </p>
        </div>
        
        <div className="bg-secondary-fixed/20 p-6 rounded-2xl border border-secondary-fixed/50 space-y-4">
          <div className="flex items-center gap-3 text-secondary">
            <Info size={20} />
            <h4 className="font-bold text-sm uppercase tracking-widest">Why we need this?</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            We use your name and PAN to verify your identity and check your pre-approved credit limit from our backend systems instantly.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lg:w-1/2 w-full glass-card p-10 rounded-[32px] shadow-2xl space-y-6 border border-outline-variant/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">First Name</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                required
                type="text"
                value={formData.firstName}
                placeholder="John"
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Last Name</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                required
                type="text"
                value={formData.lastName}
                placeholder="Doe"
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Mobile Number</label>
          <div className="relative group">
            <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
            <input 
              required
              type="tel"
              value={formData.mobileNumber}
              placeholder="+91"
              disabled={formData.mobileNumber.length === 10}
              onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-surface-container"
            />
          </div>
          {formData.mobileNumber.length === 10 && (
            <p className="text-xs text-secondary ml-1">✓ Verified via login</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
            <input 
              required
              type="email"
              value={formData.email}
              placeholder="john@example.com"
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Date of Birth</label>
            <div className="relative group">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                required
                type="date"
                value={formData.dob}
                onChange={(e) => updateFormData({ dob: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">PAN Number</label>
            <div className="relative group">
              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                required
                type="text"
                maxLength={10}
                value={formData.panNumber}
                placeholder="ABCDE1234F"
                onChange={(e) => updateFormData({ panNumber: e.target.value.toUpperCase() })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all font-medium uppercase"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-4"
        >
          Verify & Continue
        </button>
      </form>
    </div>
  );
}
