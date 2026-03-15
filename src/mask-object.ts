import type { MaskRule, DetectedType } from './types';
import { detectType } from './detect';
import { maskEmail, maskCreditCard, maskPhone, maskToken, maskCustom } from './mask';

function maskByType(value: string, type: DetectedType): string {
  switch (type) {
    case 'email': return maskEmail(value);
    case 'creditCard': return maskCreditCard(value);
    case 'phone': return maskPhone(value);
    case 'token': return maskToken(value);
    default: return maskCustom(value);
  }
}

function matchesRule(key: string, rule: MaskRule): boolean {
  if (typeof rule === 'string') {
    return key.toLowerCase() === rule.toLowerCase();
  }
  return rule.test(key);
}

export function maskObject<T extends Record<string, unknown>>(
  obj: T,
  options: { rules: MaskRule[] },
): T {
  function walk(value: unknown, key?: string): unknown {
    if (typeof value === 'string' && key && options.rules.some((r) => matchesRule(key, r))) {
      const type = detectType(value);
      return maskByType(value, type);
    }

    if (Array.isArray(value)) {
      return value.map((item) => walk(item, key));
    }

    if (typeof value === 'object' && value !== null) {
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        result[k] = walk(v, k);
      }
      return result;
    }

    return value;
  }

  return walk(obj) as T;
}
