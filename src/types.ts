export interface MaskOptions {
  show?: number;
  position?: 'start' | 'end' | 'both';
  char?: string;
}

export type MaskRule = string | RegExp;

export type DetectedType = 'email' | 'creditCard' | 'phone' | 'token' | 'unknown';
