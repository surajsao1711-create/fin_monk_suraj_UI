import React, { useState } from 'react';
import { FormData } from '../MultiStepFlow';
import { User, Smartphone, Calendar, CreditCard, Mail, Info } from 'lucide-react';

// ─── Validation helpers ───────────────────────────────────────────────────────
function validateStep1(formData: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  const mobile = formData.mobileNumber.replace(/\D/g, '');
  if (!mobile || mobile.length !== 10) {
    errors.mobileNumber = 'Enter a valid 10-digit mobile number';
  } else if (!/^[6-9]/.test(mobile)) {
    errors.mobileNumber = 'Mobile number must start with 6, 7, 8, or 9';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!formData.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const dob = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;
    if (actualAge < 18) {
      errors.dob = 'You must be at least 18 years old';
    }
  }

  if (!formData.panNumber.trim()) {
    errors.panNumber = 'PAN number is required';
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
    errors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F)';
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Step1PersonalInfo({ 
  formData, 
  updateFormData, 
  onNext 
}: { 
  formData: FormData; 
  updateFormData: (data: Partial<FormData>) => void; 
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consentCall, setConsentCall] = useState(false);
  const [consentWhatsapp, setConsentWhatsapp] = useState(false);
  const needsConsent = !localStorage.getItem('finmonk_consent_given');

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    // Validate single field on blur
    const allErrors = validateStep1(formData);
    if (allErrors[field]) {
      setErrors(prev => ({ ...prev, [field]: allErrors[field] }));
    } else {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep1(formData);
    
    // Check consent if needed
    if (needsConsent && !consentCall) {
      validationErrors.consent = 'Please agree to be contacted to continue';
    }
    
    setErrors(validationErrors);
    setTouched({ firstName: true, lastName: true, mobileNumber: true, email: true, dob: true, panNumber: true, consent: true });

    if (Object.keys(validationErrors).length === 0) {
      if (needsConsent) {
        localStorage.setItem('finmonk_consent_given', 'true');
      }
      onNext();
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-surface-container-low border rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-medium ${
      errors[field] && touched[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
        : 'border-outline-variant focus:border-secondary focus:ring-4 focus:ring-secondary/10'
    }`;

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
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">First Name</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                type="text"
                value={formData.firstName}
                placeholder="John"
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                onBlur={() => handleBlur('firstName')}
                className={inputClass('firstName')}
              />
            </div>
            {errors.firstName && touched.firstName && (
              <p className="text-xs text-red-500 ml-1">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Last Name</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                type="text"
                value={formData.lastName}
                placeholder="Doe"
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                onBlur={() => handleBlur('lastName')}
                className={inputClass('lastName')}
              />
            </div>
            {errors.lastName && touched.lastName && (
              <p className="text-xs text-red-500 ml-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Mobile Number</label>
          <div className="relative group">
            <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
            <input 
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobileNumber}
              placeholder="9876543210"
              disabled={formData.mobileNumber.length === 10}
              onChange={(e) => updateFormData({ mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              onBlur={() => handleBlur('mobileNumber')}
              className={`${inputClass('mobileNumber')} disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-surface-container`}
            />
          </div>
          {formData.mobileNumber.length === 10 && !errors.mobileNumber && (
            <p className="text-xs text-green-600 ml-1">✓ Verified via login</p>
          )}
          {errors.mobileNumber && touched.mobileNumber && (
            <p className="text-xs text-red-500 ml-1">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
            <input 
              type="email"
              value={formData.email}
              placeholder="john@example.com"
              onChange={(e) => updateFormData({ email: e.target.value })}
              onBlur={() => handleBlur('email')}
              className={inputClass('email')}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-xs text-red-500 ml-1">{errors.email}</p>
          )}
        </div>

        {/* DOB + PAN */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Date of Birth</label>
            <div className="relative group">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                type="date"
                value={formData.dob}
                onChange={(e) => updateFormData({ dob: e.target.value })}
                onBlur={() => handleBlur('dob')}
                className={inputClass('dob')}
              />
            </div>
            {errors.dob && touched.dob && (
              <p className="text-xs text-red-500 ml-1">{errors.dob}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">PAN Number</label>
            <div className="relative group">
              <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary" />
              <input 
                type="text"
                maxLength={10}
                value={formData.panNumber}
                placeholder="ABCDE1234F"
                onChange={(e) => updateFormData({ panNumber: e.target.value.toUpperCase() })}
                onBlur={() => handleBlur('panNumber')}
                className={`${inputClass('panNumber')} uppercase`}
              />
            </div>
            {errors.panNumber && touched.panNumber && (
              <p className="text-xs text-red-500 ml-1">{errors.panNumber}</p>
            )}
            {!errors.panNumber && formData.panNumber.length === 10 && touched.panNumber && (
              <p className="text-xs text-green-600 ml-1">✓ Valid PAN format</p>
            )}
          </div>
        </div>

        {/* Consent — shown only when user came directly via /personal-loan (skipped login page) */}
        {!localStorage.getItem('finmonk_consent_given') && (
          <div className="space-y-3 pt-2 border-t border-outline-variant/30">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentCall}
                onChange={(e) => setConsentCall(e.target.checked)}
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
                checked={consentWhatsapp}
                onChange={(e) => setConsentWhatsapp(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary"
              />
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I also agree to be contacted on WhatsApp for faster updates. <span className="font-medium">(Optional)</span>
              </span>
            </label>
            {errors.consent && touched.consent && (
              <p className="text-xs text-red-500 ml-1">{errors.consent}</p>
            )}
          </div>
        )}

        <button 
          type="submit"
          disabled={!localStorage.getItem('finmonk_consent_given') && !consentCall}
          className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Verify & Continue
        </button>
      </form>
    </div>
  );
}
