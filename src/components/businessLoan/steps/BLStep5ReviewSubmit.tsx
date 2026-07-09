import { useState } from 'react';
import { ChevronLeft, ShieldCheck, Lock, Sparkles, Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import { BusinessFormData } from '../BusinessLoanFlow';

interface Props {
  formData: BusinessFormData;
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

function calcEmi(principal: number, tenureMonths: number): number {
  const r = 0.125 / 12;
  const n = tenureMonths;
  return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

export default function BLStep5ReviewSubmit({ formData, onNext, onBack, onEdit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emi = calcEmi(formData.loanAmount, formData.tenure);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onNext();
    }, 2500);
  };

  // ── Submitting overlay ──────────────────────────────────────────────────────
  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 border-4 border-secondary/20 border-t-secondary rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-secondary">
            <Lock size={40} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">Finalizing your offer…</h2>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Our AI engine is performing a final check on your business profile to secure the best possible interest rate.
          </p>
        </div>
        <div className="flex gap-6 justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            <ShieldCheck size={16} /> Data Secured
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            <ShieldCheck size={16} /> ID Verified
          </div>
        </div>
      </div>
    );
  }

  // ── Review sections ─────────────────────────────────────────────────────────
  const sections = [
    {
      title: 'Promoter Details',
      step: 1,
      data: {
        'Full Name': formData.fullName || '—',
        'PAN': formData.pan ? formData.pan.replace(/.(?=.{4})/g, 'X') : '—',
        'Mobile': formData.mobile ? `+91 ${formData.mobile}` : '—',
        'Email': formData.email || '—',
      },
    },
    {
      title: 'Loan Requirement',
      step: 2,
      data: {
        'Amount': `₹${formData.loanAmount.toLocaleString('en-IN')}`,
        'Tenure': `${formData.tenure} Months`,
        'Est. EMI': `₹${emi.toLocaleString('en-IN')} / mo`,
        'Rate': '12.5% p.a.',
      },
    },
    {
      title: 'Business Details',
      step: 3,
      data: {
        'Entity Name': formData.businessName || '—',
        'Industry': formData.industry || '—',
        'GSTIN': formData.gstin || '—',
        'Turnover': formData.turnover || '—',
      },
    },
    {
      title: 'Business Address',
      step: 4,
      data: {
        'Locality': formData.locality || '—',
        'State': formData.state || '—',
        'Pincode': formData.pincode || '—',
        'Ownership': formData.ownership,
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium mb-2"
        >
          <ChevronLeft size={20} /> Back to Address
        </button>
        <h1 className="text-4xl font-bold text-primary">One last look.</h1>
        <p className="text-on-surface-variant text-lg">
          Review your application details before we submit to our banking partners.
        </p>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="glass-card p-8 rounded-[24px] border border-outline-variant/30 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(section.step)}
                className="flex items-center gap-1 text-xs font-bold text-on-surface-variant hover:text-secondary transition-colors"
              >
                <Pencil size={14} /> Edit
              </button>
            </div>
            <dl className="space-y-4">
              {Object.entries(section.data).map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline gap-4">
                  <dt className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {label}
                  </dt>
                  <dd className="text-sm font-bold text-primary text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Consent checkboxes */}
      <div className="glass-card p-8 rounded-[24px] border border-outline-variant/30 space-y-6">
        <h3 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-outline-variant/30 pb-4">
          Authorizations &amp; Consent
        </h3>
        <div className="space-y-4">
          {[
            'I authorize FinMonk to pull my credit report from CIBIL / Experian to assess loan eligibility.',
            'I agree to the Terms & Conditions and Privacy Policy of the platform.',
            'I consent to sharing my business and personal data with registered NBFC partners for loan processing.',
          ].map((text, i) => (
            <label key={i} className="flex gap-4 cursor-pointer group">
              <input
                type="checkbox"
                required
                className="mt-1 w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary shrink-0"
              />
              <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                {text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit CTA */}
      <div className="p-8 rounded-[32px] bg-secondary-container text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="flex-1 space-y-2 relative z-10">
          <h4 className="text-xl font-bold">Privacy Guarantee</h4>
          <p className="text-on-primary-container text-sm leading-relaxed">
            By clicking "Submit Application", your details will be encrypted and transmitted securely via SSL. No paper visits required for the first approval stage.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full md:w-auto bg-white text-secondary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.05] transition-transform active:scale-95 shadow-xl whitespace-nowrap relative z-10"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
