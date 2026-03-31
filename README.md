# @philiprehberger/mask-kit

[![CI](https://github.com/philiprehberger/mask-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/mask-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/mask-kit.svg)](https://www.npmjs.com/package/@philiprehberger/mask-kit)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/mask-kit)](https://github.com/philiprehberger/mask-kit/commits/main)

Data masking and redaction for logs and APIs

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

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/mask-kit)

🐛 [Report issues](https://github.com/philiprehberger/mask-kit/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/mask-kit/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
