import { useState, useEffect } from 'react';
import type { Key } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ArrowRight, ShieldCheck, Zap, Info, CheckCircle, Smartphone, User, Calendar, CreditCard, Mail, Building2, MapPin, Home, Clock, Lock, Sparkles, Building } from 'lucide-react';
import { createPersonalLoan, updatePersonalLoanStep, submitPersonalLoan } from '../lib/api';

// Steps components will be imported or defined here
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2LoanDetails from './steps/Step2LoanDetails';
import Step3EmploymentIncome from './steps/Step3EmploymentIncome';
import Step4AddressVerification from './steps/Step4AddressVerification';
import Step5FinalReview from './steps/Step5FinalReview';
import Step6Success from './steps/Step6Success';

export type FormData = {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  dob: string;
  panNumber: string;
  email: string;
  loanAmount: number;
  loanPurpose: string;
  loanTenure: number;
  employmentType: 'Salaried' | 'Self-Employed';
  employerName: string;
  monthlyIncome: number;
  pincode: string;
  city: string;
  state: string;
  address: string;
  residenceType: 'Owned' | 'Rented' | 'Parental';
  yearsAtAddress: number;
};

const initialFormData: FormData = {
  mobileNumber: '+91 98765 43210',
  firstName: '',
  lastName: '',
  dob: '',
  panNumber: '',
  email: '',
  loanAmount: 500000,
  loanPurpose: 'Home Renovation',
  loanTenure: 36,
  employmentType: 'Salaried',
  employerName: '',
  monthlyIncome: 75000,
  pincode: '',
  city: 'New Delhi',
  state: 'Delhi',
  address: '',
  residenceType: 'Owned',
  yearsAtAddress: 5,
};

export default function MultiStepFlow({ onExit }: { onExit: () => void; key?: Key }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // Create a draft application when the flow starts
  useEffect(() => {
    createPersonalLoan().then((res) => {
      if (res.success && res.data?.id) {
        setApplicationId(res.data.id);
      }
    }).catch(console.error);
  }, []);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Save step data to backend, then advance
  const saveAndNext = async (stepName: 'personal-info' | 'loan-details' | 'employment' | 'address', data: Record<string, any>) => {
    if (applicationId) {
      await updatePersonalLoanStep(applicationId, stepName, data).catch(console.error);
    }
    nextStep();
  };

  // Submit the application
  const handleSubmit = async () => {
    if (applicationId) {
      await submitPersonalLoan(applicationId).catch(console.error);
    }
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1PersonalInfo formData={formData} updateFormData={updateFormData} onNext={() => {
        saveAndNext('personal-info', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          pan: formData.panNumber,
          mobile: formData.mobileNumber.replace(/\D/g, '').slice(-10),
        });
      }} />;
      case 2: return <Step2LoanDetails formData={formData} updateFormData={updateFormData} onNext={() => {
        saveAndNext('loan-details', {
          loanAmount: formData.loanAmount,
          loanTenure: formData.loanTenure,
          loanPurpose: formData.loanPurpose,
        });
      }} onBack={prevStep} />;
      case 3: return <Step3EmploymentIncome formData={formData} updateFormData={updateFormData} onNext={() => {
        saveAndNext('employment', {
          employmentType: formData.employmentType,
          employerName: formData.employerName,
          monthlyIncome: formData.monthlyIncome,
        });
      }} onBack={prevStep} />;
      case 4: return <Step4AddressVerification formData={formData} updateFormData={updateFormData} onNext={() => {
        saveAndNext('address', {
          addressLine: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          residenceType: formData.residenceType,
          yearsAtAddress: formData.yearsAtAddress,
        });
      }} onBack={prevStep} />;
      case 5: return <Step5FinalReview formData={formData} onNext={handleSubmit} onBack={prevStep} />;
      case 6: return <Step6Success formData={formData} onExit={onExit} />;
      default: return null;
    }
  };

  const totalSteps = 5;
  const progress = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col bg-surface dark:bg-surface">
      {step < 6 && (
        <div className="sticky top-[64px] z-40 bg-surface/80 dark:bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 dark:border-slate-800 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-secondary dark:text-blue-400 uppercase tracking-[0.2em]">Step {step} of {totalSteps}</span>
              <span className="text-xs font-medium text-on-surface-variant dark:text-slate-400">
                {step === 1 && "Tell us about yourself"}
                {step === 2 && "Loan Parameters"}
                {step === 3 && "Employment & Income"}
                {step === 4 && "Address Verification"}
                {step === 5 && "Final Review"}
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

      {/* Persistent Back button if needed or handle within steps */}
    </div>
  );
}
