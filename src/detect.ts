import type { DetectedType } from './types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CC_RE = /^\d{13,19}$/;
const PHONE_RE = /^[\d\s+\-().]{7,20}$/;
const JWT_RE = /^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

function luhnCheck(num: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export function detectType(value: string): DetectedType {
  if (EMAIL_RE.test(value)) return 'email';
  
  const digits = value.replace(/[\s-]/g, '');
  if (CC_RE.test(digits) && luhnCheck(digits)) return 'creditCard';
  
  if (JWT_RE.test(value)) return 'token';
  if (PHONE_RE.test(value) && value.replace(/\D/g, '').length >= 7) return 'phone';
  
  return 'unknown';
}
