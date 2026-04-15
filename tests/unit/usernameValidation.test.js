const { expect } = require('chai');
const { isValidUsername } = require('../../src/utils/validators');

describe('Username Validation', () => {
  it('should accept valid username with 3 characters', () => {
    expect(isValidUsername('abc')).to.be.true;
  });

  it('should accept valid username with more than 3 characters', () => {
    expect(isValidUsername('john_doe')).to.be.true;
  });

  it('should reject username with 2 characters', () => {
    expect(isValidUsername('ab')).to.be.false;
  });

  it('should reject empty username', () => {
    expect(isValidUsername('')).to.be.false;
  });

  it('should reject null username', () => {
    expect(isValidUsername(null)).to.be.false;
  });

  it('should reject undefined username', () => {
    expect(isValidUsername(undefined)).to.be.false;
  });

  it('should accept username with exactly 50 characters', () => {
    const longUsername = 'a'.repeat(50);
    expect(isValidUsername(longUsername)).to.be.true;
  });

  it('should reject username with 51 characters', () => {
    const tooLongUsername = 'a'.repeat(51);
    expect(isValidUsername(tooLongUsername)).to.be.false;
  });

  it('should accept username with special characters', () => {
    expect(isValidUsername('user_name-123')).to.be.true;
  });

  it('should handle boundary case - exactly 3 characters', () => {
    expect(isValidUsername('xyz')).to.be.true;
  });
});
