# @philiprehberger/mask-kit

[![CI](https://github.com/philiprehberger/ts-mask-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-mask-kit/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/mask-kit.svg)](https://www.npmjs.com/package/@philiprehberger/mask-kit)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-mask-kit)](https://github.com/philiprehberger/ts-mask-kit/commits/main)

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

### Format-Preserving Masks

Keep delimiters and separators in place while masking alphanumeric characters:

```ts
import { maskFormatPreserving } from '@philiprehberger/mask-kit';

maskFormatPreserving('(555) 123-4567');
// "(***) ***-****"

maskFormatPreserving('(555) 123-4567', { revealLast: 4 });
// "(***) ***-4567"

maskFormatPreserving('4111-2222-3333-4444', { revealLast: 4, revealFirst: 4 });
// "4111-****-****-4444"
```

### Configurable Reveal Count

Control exactly how many characters remain visible:

```ts
import { revealFirst, revealLast } from '@philiprehberger/mask-kit';

revealFirst('secretdata', 3);   // "sec*******"
revealLast('secretdata', 4);    // "******data"
revealFirst('abc', 5);          // "abc" (no masking if count >= length)
revealLast('token_xyz', 3, { char: '#' }); // "######xyz"
```

### Regex-Based Masking

Mask substrings that match a regular expression:

```ts
import { maskByPattern } from '@philiprehberger/mask-kit';

// Mask all digits
maskByPattern('Order #12345 shipped', /\d+/);
// "Order #***** shipped"

// Mask email-like patterns in free text
maskByPattern('Contact user@mail.com for info', /[^\s@]+@[^\s@]+/);
// "Contact ************* for info"

// Mask SSN patterns
maskByPattern('SSN: 123-45-6789', /\d{3}-\d{2}-\d{4}/);
// "SSN: ***********"
```

### Deep Object Masking

Recursively traverse nested objects and arrays, masking values by key name:

```ts
import { maskDeep } from '@philiprehberger/mask-kit';

const input = {
  user: {
    name: 'Alice',
    password: 'hunter2',
    addresses: [
      { street: '123 Main St', ssn: '999-00-1234' },
    ],
  },
  apiKey: 'sk-abc123',
};

maskDeep(input, ['password', 'ssn', 'apiKey']);
// {
//   user: {
//     name: 'Alice',
//     password: '*******',
//     addresses: [
//       { street: '123 Main St', ssn: '***********' },
//     ],
//   },
//   apiKey: '********',
// }
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
| `maskFormatPreserving(value, options?)` | Mask alphanumeric chars while keeping delimiters |
| `revealFirst(value, count, options?)` | Reveal first N characters, mask the rest |
| `revealLast(value, count, options?)` | Reveal last N characters, mask the rest |
| `maskByPattern(value, regex, options?)` | Mask substrings matching a regex pattern |
| `maskObject(obj, { rules })` | Deep-walk and mask matching keys with auto-detection |
| `maskDeep(obj, sensitiveKeys, options?)` | Recursively mask values by key name |
| `detectType(value)` | Auto-detect value type |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-mask-kit)

🐛 [Report issues](https://github.com/philiprehberger/ts-mask-kit/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-mask-kit/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
