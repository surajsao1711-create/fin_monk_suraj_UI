import { useState } from 'react';
import type { Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BLStep1PromoterInfo from './steps/BLStep1PromoterInfo';
import BLStep2LoanRequirement from './steps/BLStep2LoanRequirement';
import BLStep3BusinessDetails from './steps/BLStep3BusinessDetails';
import BLStep4BusinessAddress from './steps/BLStep4BusinessAddress';
import BLStep5ReviewSubmit from './steps/BLStep5ReviewSubmit';
import BLStep6Success from './steps/BLStep6Success';

// ─── Shared form data type ────────────────────────────────────────────────────
export type BusinessFormData = {
  // Step 1 – Promoter
  mobile: string;
  fullName: string;
  pan: string;
  dob: string;
  email: string;
  // Step 2 – Loan
  loanAmount: number;
  tenure: number;
  // Step 3 – Business
  businessName: string;
  industry: string;
  gstin: string;
  turnover: string;
  // Step 4 – Address
  pincode: string;
  locality: string;
  state: string;
  ownership: 'Owned' | 'Rented';
  address: string;
  yearsAtAddress: number;
};

const initialFormData: BusinessFormData = {
  mobile: '',
  fullName: '',
  pan: '',
  dob: '',
  email: '',
  loanAmount: 2500000,
  tenure: 36,
  businessName: '',
  industry: '',
  gstin: '',
  turnover: '',
  pincode: '',
  locality: '',
  state: '',
  ownership: 'Owned',
  address: '',
  yearsAtAddress: 5,
};

const STEP_LABELS: Record<number, string> = {
  1: 'Promoter Details',
  2: 'Loan Requirement',
  3: 'Business Details',
  4: 'Business Address',
  5: 'Review & Submit',
};

const TOTAL_STEPS = 5;

interface BusinessLoanFlowProps {
  onExit: () => void;
  key?: Key;
}

export default function BusinessLoanFlow({ onExit }: BusinessLoanFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>(initialFormData);

  const nextStep = () => setStep((s: number) => s + 1);
  const prevStep = () => setStep((s: number) => s - 1);
  const goToStep = (s: number) => setStep(s);

  const updateFormData = (data: Partial<BusinessFormData>) => {
    setFormData((prev: BusinessFormData) => ({ ...prev, ...data }));
  };

  const progress = Math.min((step / TOTAL_STEPS) * 100, 100);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BLStep1PromoterInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case 2:
        return <BLStep2LoanRequirement formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <BLStep3BusinessDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <BLStep4BusinessAddress formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <BLStep5ReviewSubmit formData={formData} onNext={nextStep} onBack={prevStep} onEdit={goToStep} />;
      case 6:
        return <BLStep6Success formData={formData} onExit={onExit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-surface dark:bg-surface">
      {/* Progress bar — hidden on success screen */}
      {step < 6 && (
        <div className="sticky top-[64px] z-40 bg-surface/80 dark:bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 dark:border-slate-800 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-secondary dark:text-blue-400 uppercase tracking-[0.2em]">
                Step {step} of {TOTAL_STEPS}
              </span>
              <span className="text-xs font-medium text-on-surface-variant dark:text-slate-400">
                {STEP_LABELS[step]}
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-secondary shadow-[0_0_10px_rgba(0,82,208,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
