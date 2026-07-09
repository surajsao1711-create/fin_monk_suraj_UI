import { useState, useEffect } from 'react';
import type { Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createCarLoan, updateCarLoanStep, submitCarLoan } from '../../lib/api';
import CLStep1PersonalInfo from './steps/CLStep1PersonalInfo';
import CLStep2CarDetails from './steps/CLStep2CarDetails';
import CLStep3LoanDetails from './steps/CLStep3LoanDetails';
import CLStep4Employment from './steps/CLStep4Employment';
import CLStep5ReviewSubmit from './steps/CLStep5ReviewSubmit';
import CLStep6Success from './steps/CLStep6Success';

// ─── Car Loan form data ───────────────────────────────────────────────────────
export type CarLoanFormData = {
  // Step 1 – Personal info
  fullName: string;
  mobile: string;
  email: string;
  // Step 2 – Car details
  product: 'LAC' | 'UCL' | 'NCL' | '';
  rcOwnership: 'self' | 'family' | 'active_loan' | '';
  carBrand: string;
  carYear: string;
  // Step 3 – Loan details
  carValue: string;
  loanAmount: string;
  city: string;
  // Step 4 – Employment
  employmentType: string;
  monthlyIncome: string;
  // Consent
  consentCall: boolean;
  consentWhatsapp: boolean;
};

const initialFormData: CarLoanFormData = {
  fullName: '',
  mobile: '',
  email: '',
  product: 'LAC',
  rcOwnership: '',
  carBrand: '',
  carYear: '',
  carValue: '',
  loanAmount: '',
  city: '',
  employmentType: '',
  monthlyIncome: '',
  consentCall: false,
  consentWhatsapp: false,
};

const STEP_LABELS: Record<number, string> = {
  1: 'Your Details',
  2: 'Car Information',
  3: 'Loan Requirements',
  4: 'Employment & Income',
  5: 'Review & Submit',
};

const TOTAL_STEPS = 5;

interface CarLoanFlowProps {
  onExit: () => void;
  key?: Key;
}

export default function CarLoanFlow({ onExit }: CarLoanFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CarLoanFormData>(initialFormData);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // Create a draft application on mount
  useEffect(() => {
    createCarLoan().then((res) => {
      if (res.success && res.data?.id) {
        setApplicationId(res.data.id);
      }
    }).catch(console.error);
  }, []);

  const nextStep = () => setStep((s: number) => s + 1);
  const prevStep = () => setStep((s: number) => s - 1);
  const goToStep = (s: number) => setStep(s);

  const updateFormData = (data: Partial<CarLoanFormData>) => {
    setFormData((prev: CarLoanFormData) => ({ ...prev, ...data }));
  };

  const saveAndNext = async (stepName: 'personal-info' | 'car-details' | 'loan-details' | 'employment' | 'consent', data: Record<string, any>) => {
    if (applicationId) {
      await updateCarLoanStep(applicationId, stepName, data).catch(console.error);
    }
    nextStep();
  };

  const handleSubmit = async () => {
    if (applicationId) {
      await submitCarLoan(applicationId).catch(console.error);
    }
    nextStep();
  };

  const progress = Math.min((step / TOTAL_STEPS) * 100, 100);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CLStep1PersonalInfo formData={formData} updateFormData={updateFormData} onNext={() => {
          saveAndNext('personal-info', {
            fullName: formData.fullName,
            mobile: formData.mobile,
            email: formData.email || undefined,
          });
          // Also save consent
          if (applicationId) {
            updateCarLoanStep(applicationId, 'consent', {
              consentCall: formData.consentCall,
              consentWhatsapp: formData.consentWhatsapp,
            }).catch(console.error);
          }
        }} />;
      case 2:
        return <CLStep2CarDetails formData={formData} updateFormData={updateFormData} onNext={() => {
          saveAndNext('car-details', {
            product: formData.product,
            rcOwnership: formData.rcOwnership.toUpperCase(),
            carBrand: formData.carBrand,
            carYear: formData.carYear,
          });
        }} onBack={prevStep} />;
      case 3:
        return <CLStep3LoanDetails formData={formData} updateFormData={updateFormData} onNext={() => {
          saveAndNext('loan-details', {
            carValue: formData.carValue,
            loanAmount: formData.loanAmount,
            city: formData.city,
          });
        }} onBack={prevStep} />;
      case 4:
        return <CLStep4Employment formData={formData} updateFormData={updateFormData} onNext={() => {
          saveAndNext('employment', {
            employmentType: formData.employmentType,
            monthlyIncome: formData.monthlyIncome,
          });
        }} onBack={prevStep} />;
      case 5:
        return <CLStep5ReviewSubmit formData={formData} onNext={handleSubmit} onBack={prevStep} onEdit={goToStep} />;
      case 6:
        return <CLStep6Success formData={formData} onExit={onExit} />;
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
