import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, MessageCircle, ArrowRight, ShieldCheck, Car } from 'lucide-react';
import type { CarLoanFormData } from '../CarLoanFlow';

// ─── Floating particle halo ───────────────────────────────────────────────────
function ParticleHalo() {
  return (
    <svg
      className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] animate-pulse opacity-40 pointer-events-none"
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="4" fill="#226bf8" />
      <circle cx="160" cy="50" r="3" fill="#0052d0" />
      <circle cx="30" cy="150" r="5" fill="#0d1c32" />
      <circle cx="170" cy="140" r="4" fill="#b3c5ff" />
      <path
        d="M100 20 L102 24 L106 24 L103 27 L104 31 L100 29 L96 31 L97 27 L94 24 L98 24 Z"
        fill="#226bf8"
      />
    </svg>
  );
}

// ─── Inline SVG checkmark ─────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-16 h-16 md:w-20 md:h-20"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

// ─── Action card ──────────────────────────────────────────────────────────────
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  href?: string;
}

function ActionCard({ icon, title, description, linkLabel, href = '#' }: ActionCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl text-left border border-outline-variant/30 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group">
      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-primary mb-1">{title}</h3>
      <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">{description}</p>
      <a
        href={href}
        className="inline-flex items-center gap-1 text-secondary text-sm font-medium hover:underline"
      >
        {linkLabel}
        <ArrowRight size={16} />
      </a>
    </div>
  );
}

// ─── Reference ID ─────────────────────────────────────────────────────────────
function buildRefId(formData: CarLoanFormData): string {
  const seed = (formData.mobile + formData.carBrand).replace(/\D/g, '').slice(-6) || '456789';
  return `FM-CL-${seed}`;
}

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  formData: CarLoanFormData;
  onExit: () => void;
}

export default function CLStep6Success({ formData, onExit }: Props) {
  const refId = buildRefId(formData);

  return (
    <div className="max-w-3xl mx-auto w-full text-center py-16 px-4">
      {/* Hero checkmark */}
      <div className="relative inline-flex items-center justify-center mb-12">
        <ParticleHalo />
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center success-gradient"
          style={{ boxShadow: '0 0 40px rgba(0, 82, 208, 0.35)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 120 }}
        >
          <CheckIcon />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.div
        className="mb-10 space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
          You're on your way! 🎉
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Hi <span className="font-bold text-primary">{formData.fullName || 'there'}</span>, your car loan eligibility check is confirmed.
          Reference: <span className="font-bold text-secondary">{refId}</span>
        </p>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto">
          Our loan advisor will call you at <span className="font-medium text-primary">+91 {formData.mobile}</span> within the next 2 hours.
        </p>
      </motion.div>

      {/* What to keep ready */}
      <motion.div
        className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 max-w-md mx-auto mb-10 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Car size={18} className="text-secondary" />
          <h3 className="font-bold text-primary text-sm">Keep these ready for the call</h3>
        </div>
        <ul className="space-y-2 text-sm text-on-surface-variant">
          <li className="flex items-center gap-2">• RC copy of your car</li>
          <li className="flex items-center gap-2">• Aadhaar + PAN card</li>
          <li className="flex items-center gap-2">• Last 6 months bank statement</li>
          <li className="flex items-center gap-2">• Car insurance copy</li>
        </ul>
      </motion.div>

      {/* Action cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <ActionCard
          icon={<LayoutDashboard size={22} className="text-secondary" />}
          title="Track Application"
          description="Monitor your application status and upload documents."
          linkLabel="View My Progress"
        />
        <ActionCard
          icon={<MessageCircle size={22} className="text-secondary" />}
          title="WhatsApp Us"
          description="Get faster updates and instant support on WhatsApp."
          linkLabel="Chat Now"
        />
      </motion.div>

      {/* Security note */}
      <motion.div
        className="flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <ShieldCheck size={18} className="text-on-surface-variant" aria-hidden="true" />
        <span className="text-sm text-on-surface-variant">
          Your data is secured with AES-256 encryption.
        </span>
      </motion.div>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="mt-8 px-6 py-3 rounded-xl bg-surface-container border border-outline-variant text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}
