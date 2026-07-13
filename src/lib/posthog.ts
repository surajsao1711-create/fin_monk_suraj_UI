/**
 * PostHog Analytics - Frontend
 * Tracks user events, page views, and funnel conversions.
 */
import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || 'phc_m5sXPxKQCeuwi3N2N6kFYtj66v32JiLuJXeDxeVCzDZi';
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let initialized = false;

export function initPostHog() {
  if (initialized || typeof window === 'undefined') return;
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });

  initialized = true;
}

// ─── Identify user after login ────────────────────────────────────────────────
export function identifyUser(userId: string, mobile: string) {
  if (!initialized) return;
  posthog.identify(userId, { mobile });
}

// ─── Track custom events ──────────────────────────────────────────────────────
export function trackEvent(event: string, properties?: Record<string, any>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

// ─── Pre-built event helpers ──────────────────────────────────────────────────
export const PostHog = {
  // Auth
  loginCompleted: (mobile: string) =>
    trackEvent('login_completed', { mobile }),

  // Loan flows
  loanFlowStarted: (loanType: 'personal' | 'business' | 'car') =>
    trackEvent('loan_flow_started', { loan_type: loanType }),

  loanStepCompleted: (loanType: string, step: number, stepName: string) =>
    trackEvent('loan_step_completed', { loan_type: loanType, step, step_name: stepName }),

  loanSubmitted: (loanType: string, applicationId: string) =>
    trackEvent('loan_submitted', { loan_type: loanType, application_id: applicationId }),

  // Consent
  consentGiven: (callConsent: boolean, whatsappConsent: boolean) =>
    trackEvent('consent_given', { call: callConsent, whatsapp: whatsappConsent }),

  // Page views
  pageViewed: (page: string) =>
    trackEvent('$pageview', { page }),
};
