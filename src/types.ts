export interface MaskOptions {
  show?: number;
  position?: 'start' | 'end' | 'both';
  char?: string;
}

export interface FormatPreservingOptions {
  revealLast?: number;
  revealFirst?: number;
  char?: string;
}

export interface RevealOptions {
  char?: string;
}

export interface MaskByPatternOptions {
  char?: string;
}

export interface DeepMaskOptions {
  rules: MaskRule[];
}

export type MaskRule = string | RegExp;

export type DetectedType = 'email' | 'creditCard' | 'phone' | 'token' | 'unknown';
