/**
 * FinMonk API Client
 * Handles all communication with the backend API.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Token storage
let accessToken: string | null = localStorage.getItem('finmonk_access_token');
let refreshToken: string | null = localStorage.getItem('finmonk_refresh_token');

export function getAccessToken(): string | null {
  return accessToken;
}

export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem('finmonk_access_token', access);
  localStorage.setItem('finmonk_refresh_token', refresh);
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('finmonk_access_token');
  localStorage.removeItem('finmonk_refresh_token');
}

export function isLoggedIn(): boolean {
  return !!accessToken;
}

// Core fetch wrapper with auth
async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // If 401, try to refresh token
  if (res.status === 401 && refreshToken) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      const retryRes = await fetch(`${API_BASE}${path}`, { ...options, headers });
      return retryRes.json();
    }
  }

  return res.json();
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (res.ok) {
      const data = await res.json();
      setTokens(data.data.accessToken, data.data.refreshToken);
      return true;
    }
  } catch {}
  clearTokens();
  return false;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(mobile: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile }),
  });
  const data = await res.json();
  if (data.success) {
    setTokens(data.data.accessToken, data.data.refreshToken);
  }
  return data;
}

export async function logout() {
  await apiFetch('/api/auth/logout', { method: 'POST' });
  clearTokens();
}

// ─── Personal Loan ────────────────────────────────────────────────────────────

export async function createPersonalLoan() {
  return apiFetch('/api/loans/personal', { method: 'POST' });
}

export async function updatePersonalLoanStep(
  id: string,
  step: 'personal-info' | 'loan-details' | 'employment' | 'address',
  data: Record<string, any>,
) {
  return apiFetch(`/api/loans/personal/${id}/${step}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function submitPersonalLoan(id: string) {
  return apiFetch(`/api/loans/personal/${id}/submit`, { method: 'POST' });
}

export async function getPersonalLoans() {
  return apiFetch('/api/loans/personal', { method: 'GET' });
}

// ─── Business Loan ────────────────────────────────────────────────────────────

export async function createBusinessLoan() {
  return apiFetch('/api/loans/business', { method: 'POST' });
}

export async function updateBusinessLoanStep(
  id: string,
  step: 'promoter-info' | 'loan-requirement' | 'business-details' | 'business-address',
  data: Record<string, any>,
) {
  return apiFetch(`/api/loans/business/${id}/${step}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function submitBusinessLoan(id: string) {
  return apiFetch(`/api/loans/business/${id}/submit`, { method: 'POST' });
}

// ─── Car Loan ─────────────────────────────────────────────────────────────────

export async function createCarLoan() {
  return apiFetch('/api/loans/car', { method: 'POST' });
}

export async function updateCarLoanStep(
  id: string,
  step: 'personal-info' | 'car-details' | 'loan-details' | 'employment' | 'consent',
  data: Record<string, any>,
) {
  return apiFetch(`/api/loans/car/${id}/${step}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function submitCarLoan(id: string) {
  return apiFetch(`/api/loans/car/${id}/submit`, { method: 'POST' });
}

// ─── Tools (public) ───────────────────────────────────────────────────────────

export async function calculateEMI(principal: number, annualRate: number, tenureMonths: number) {
  const res = await fetch(
    `${API_BASE}/api/tools/emi-calculator?principal=${principal}&annualRate=${annualRate}&tenureMonths=${tenureMonths}`,
  );
  return res.json();
}

export async function checkEligibility(employmentType: string, monthlyIncome: number, requestedAmount: number) {
  const res = await fetch(
    `${API_BASE}/api/tools/eligibility?employmentType=${employmentType}&monthlyIncome=${monthlyIncome}&requestedAmount=${requestedAmount}`,
  );
  return res.json();
}
