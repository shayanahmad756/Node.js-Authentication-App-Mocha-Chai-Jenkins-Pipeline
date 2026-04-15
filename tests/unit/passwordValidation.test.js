const { expect } = require('chai');
const { isValidPassword } = require('../../src/utils/validators');

describe('Password Validation', () => {
  it('should accept valid password with 6 characters', () => {
    expect(isValidPassword('123456')).to.be.true;
  });

  it('should accept valid password with more than 6 characters', () => {
    expect(isValidPassword('password123')).to.be.true;
  });

  it('should reject password with 5 characters', () => {
    expect(isValidPassword('12345')).to.be.false;
  });

  it('should reject empty password', () => {
    expect(isValidPassword('')).to.be.false;
  });

  it('should reject null password', () => {
    expect(isValidPassword(null)).to.be.false;
  });

  it('should reject undefined password', () => {
    expect(isValidPassword(undefined)).to.be.false;
  });

  it('should accept password with special characters', () => {
    expect(isValidPassword('pass@123')).to.be.true;
  });

  it('should accept password with spaces', () => {
    expect(isValidPassword('pass word')).to.be.true;
  });

  it('should handle boundary case - exactly 6 characters', () => {
    expect(isValidPassword('abcdef')).to.be.true;
  });
});
