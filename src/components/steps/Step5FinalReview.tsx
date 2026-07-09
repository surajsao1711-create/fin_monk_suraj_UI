import { FormData } from '../MultiStepFlow';
import { ChevronLeft, ShieldCheck, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Step5FinalReview({ 
  formData, 
  onNext,
  onBack
}: { 
  formData: FormData; 
  onNext: () => void;
  onBack: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Call the real submit handler (parent handles API call)
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const sections = [
    { title: 'Personal', data: { 'Name': `${formData.firstName} ${formData.lastName}`, 'PAN': formData.panNumber, 'Email': formData.email } },
    { title: 'Loan Details', data: { 'Amount': `₹${formData.loanAmount.toLocaleString()}`, 'Tenure': `${formData.loanTenure} Months`, 'Purpose': formData.loanPurpose } },
    { title: 'Financials', data: { 'Employment': formData.employmentType, 'Monthly Income': `₹${formData.monthlyIncome.toLocaleString()}`, 'Employer': formData.employerName } },
    { title: 'Residence', data: { 'Location': `${formData.city}, ${formData.state}`, 'Pincode': formData.pincode, 'Status': formData.residenceType } }
  ];

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-4 border-secondary/20 border-t-secondary rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center text-secondary">
            <Lock size={40} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">Finalizing your offer...</h2>
          <p className="text-on-surface-variant max-w-md mx-auto">Our AI engine is performing a final check on your stability and credit score to secure the best possible interest rate.</p>
        </div>
        <div className="flex gap-4 justify-center">
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

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors font-medium mb-4"
        >
          <ChevronLeft size={20} /> Back to Edit
        </button>
        <h1 className="text-4xl font-bold text-primary">One last look.</h1>
        <p className="text-on-surface-variant text-lg">Review your application details before we submit it to our banking partners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-8 rounded-[24px] border border-outline-variant/30 space-y-6">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest border-b border-outline-variant/30 pb-4">{section.title}</h3>
            <dl className="space-y-4">
              {Object.entries(section.data).map(([label, value]) => (
                <div key={label} className="flex justify-between items-baseline gap-4">
                  <dt className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{label}</dt>
                  <dd className="text-sm font-bold text-primary text-right">{value || 'N/A'}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[32px] bg-secondary-container text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="flex-1 space-y-2 relative z-10">
          <h4 className="text-xl font-bold">Privacy Guarantee</h4>
          <p className="text-on-primary-container text-sm leading-relaxed">By clicking "Submit Application", your details will be encrypted and transmitted securely via secure SSL. No paper visits required for the first approval stage.</p>
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
