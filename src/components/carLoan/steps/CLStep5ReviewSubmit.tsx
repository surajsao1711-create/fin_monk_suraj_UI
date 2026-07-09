import React from 'react';
import { ChevronLeft, Edit3, User, Car, IndianRupee, Briefcase, CheckCircle } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

interface Props {
  formData: CarLoanFormData;
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

function SectionCard({
  icon,
  title,
  editStep,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  editStep: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="font-bold text-primary text-base">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onEdit(editStep)}
          className="flex items-center gap-1 text-xs font-medium text-secondary hover:underline"
        >
          <Edit3 size={12} /> Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-on-surface-variant uppercase tracking-wider">{label}</div>
      <div className="text-sm font-medium text-primary mt-0.5">{value || '—'}</div>
    </div>
  );
}

export default function CLStep5ReviewSubmit({ formData, onNext, onBack, onEdit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const productLabel = formData.product === 'LAC' ? 'Loan Against Car' :
    formData.product === 'UCL' ? 'Used Car Loan' : 'New Car Loan';

  const rcLabel = formData.rcOwnership === 'self' ? 'In my name' :
    formData.rcOwnership === 'family' ? 'Family member' : 'Active loan';

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Review your application</h1>
        <p className="text-on-surface-variant">
          Please verify all details before submitting. You can edit any section by clicking Edit.
        </p>
      </div>

      {/* Sections */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <SectionCard icon={<User size={18} className="text-secondary" />} title="Personal Info" editStep={1} onEdit={onEdit}>
          <Field label="Full Name" value={formData.fullName} />
          <Field label="Mobile" value={formData.mobile} />
          <Field label="Email" value={formData.email || 'Not provided'} />
          <Field label="Call Consent" value={formData.consentCall ? 'Yes' : 'No'} />
        </SectionCard>

        <SectionCard icon={<Car size={18} className="text-secondary" />} title="Car Details" editStep={2} onEdit={onEdit}>
          <Field label="Loan Type" value={productLabel} />
          <Field label="RC Ownership" value={rcLabel} />
          <Field label="Car Brand" value={formData.carBrand} />
          <Field label="Car Year" value={formData.carYear} />
        </SectionCard>

        <SectionCard icon={<IndianRupee size={18} className="text-secondary" />} title="Loan Details" editStep={3} onEdit={onEdit}>
          <Field label="Car Value" value={formData.carValue} />
          <Field label="Loan Amount" value={formData.loanAmount} />
          <Field label="City" value={formData.city} />
        </SectionCard>

        <SectionCard icon={<Briefcase size={18} className="text-secondary" />} title="Employment" editStep={4} onEdit={onEdit}>
          <Field label="Occupation" value={formData.employmentType} />
          <Field label="Monthly Income" value={formData.monthlyIncome} />
        </SectionCard>

        {/* Submit */}
        <div className="pt-4 space-y-4">
          <button
            type="submit"
            className="w-full gradient-button text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-secondary/20 flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            Submit Application
          </button>
          <p className="text-center text-xs text-on-surface-variant">
            By submitting, you agree to our Terms & Privacy Policy. Your data is encrypted and secure.
          </p>
        </div>
      </form>
    </div>
  );
}
