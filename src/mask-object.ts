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

/**
 * Deep object masking that recursively traverses nested objects and arrays,
 * masking string values whose keys match the sensitive keys list.
 * Unlike maskObject, this takes a simple array of key names and uses a
 * default masking strategy (full replacement with mask char).
 */
export function maskDeep<T>(
  obj: T,
  sensitiveKeys: string[],
  options: { char?: string } = {},
): T {
  const { char = '*' } = options;
  const lowerKeys = new Set(sensitiveKeys.map((k) => k.toLowerCase()));

  function walk(value: unknown, key?: string): unknown {
    if (typeof value === 'string' && key && lowerKeys.has(key.toLowerCase())) {
      return char.repeat(value.length);
    }

    if (typeof value === 'number' && key && lowerKeys.has(key.toLowerCase())) {
      return char.repeat(String(value).length);
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
