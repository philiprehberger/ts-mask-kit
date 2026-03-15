import type { MaskOptions } from './types';

function applyMask(str: string, options: MaskOptions = {}): string {
  const { show = 3, position = 'start', char = '*' } = options;
  const len = str.length;
  if (len <= show) return char.repeat(len);

  switch (position) {
    case 'start':
      return str.slice(0, show) + char.repeat(len - show);
    case 'end':
      return char.repeat(len - show) + str.slice(-show);
    case 'both': {
      const half = Math.ceil(show / 2);
      const rest = show - half;
      return str.slice(0, half) + char.repeat(len - show) + str.slice(-rest || undefined);
    }
  }
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return applyMask(email);
  const [name, ...tld] = domain.split('.');
  const maskedLocal = local.length <= 1 ? '*' : local[0] + '*'.repeat(local.length - 1);
  const maskedDomain = name.length <= 1 ? '*' : name[0] + '*'.repeat(name.length - 1);
  return `${maskedLocal}@${maskedDomain}.${tld.join('.')}`;
}

export function maskCreditCard(card: string): string {
  const digits = card.replace(/\D/g, '');
  if (digits.length < 4) return '*'.repeat(digits.length);
  return '*'.repeat(digits.length - 4) + digits.slice(-4);
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 3) return '*'.repeat(digits.length);
  return '*'.repeat(digits.length - 3) + digits.slice(-3);
}

export function maskToken(token: string): string {
  if (token.length <= 8) return '*'.repeat(token.length);
  return token.slice(0, 4) + '*'.repeat(token.length - 8) + token.slice(-4);
}

export function maskIP(ip: string): string {
  const parts = ip.split('.');
  if (parts.length === 4) {
    return parts[0] + '.*.*.' + parts[3];
  }
  return applyMask(ip, { show: 4, position: 'start' });
}

export function maskCustom(str: string, options?: MaskOptions): string {
  return applyMask(str, options);
}
