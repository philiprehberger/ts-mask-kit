import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('mask-kit', () => {
  it('should export maskEmail', () => {
    assert.ok(mod.maskEmail);
  });

  it('should export maskCreditCard', () => {
    assert.ok(mod.maskCreditCard);
  });

  it('should export maskPhone', () => {
    assert.ok(mod.maskPhone);
  });

  it('should export maskToken', () => {
    assert.ok(mod.maskToken);
  });

  it('should export maskIP', () => {
    assert.ok(mod.maskIP);
  });

  it('should export maskCustom', () => {
    assert.ok(mod.maskCustom);
  });

  it('should export maskObject', () => {
    assert.ok(mod.maskObject);
  });

  it('should export detectType', () => {
    assert.ok(mod.detectType);
  });
});
