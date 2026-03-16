# @philiprehberger/mask-kit

[![CI](https://github.com/philiprehberger/mask-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/mask-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/mask-kit.svg)](https://www.npmjs.com/package/@philiprehberger/mask-kit)
[![License](https://img.shields.io/github/license/philiprehberger/mask-kit)](LICENSE)

Data masking and redaction for logs and APIs.

## Installation

```bash
npm install @philiprehberger/mask-kit
```

## Usage

```ts
import { maskEmail, maskCreditCard, maskObject } from '@philiprehberger/mask-kit';

maskEmail('user@example.com');     // "u***@e******.com"
maskCreditCard('4111111111111111'); // "************1111"

const safe = maskObject(requestBody, {
  rules: ['password', 'secret', /token/i, 'creditCard'],
});
logger.info('Request', safe);
```

## API

| Function | Description |
|----------|-------------|
| `maskEmail(email)` | Mask email preserving structure |
| `maskCreditCard(card)` | Show last 4 digits |
| `maskPhone(phone)` | Show last 3 digits |
| `maskToken(token)` | Show first/last 4 chars |
| `maskIP(ip)` | Mask middle octets |
| `maskCustom(str, options?)` | Custom masking with position control |
| `maskObject(obj, { rules })` | Deep-walk and mask matching keys |
| `detectType(value)` | Auto-detect value type |

## License

MIT
