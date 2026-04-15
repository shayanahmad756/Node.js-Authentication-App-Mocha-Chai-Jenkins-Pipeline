const { expect } = require('chai');
const { isValidEmail } = require('../../src/utils/validators');

describe('Email Validation', () => {
  it('should accept valid email', () => {
    expect(isValidEmail('test@example.com')).to.be.true;
  });

  it('should accept valid email with subdomain', () => {
    expect(isValidEmail('user@mail.example.com')).to.be.true;
  });

  it('should reject email missing @', () => {
    expect(isValidEmail('testexample.com')).to.be.false;
  });

  it('should reject email missing domain', () => {
    expect(isValidEmail('test@')).to.be.false;
  });

  it('should reject empty email', () => {
    expect(isValidEmail('')).to.be.false;
  });

  it('should reject null email', () => {
    expect(isValidEmail(null)).to.be.false;
  });

  it('should reject undefined email', () => {
    expect(isValidEmail(undefined)).to.be.false;
  });

  it('should reject email with spaces', () => {
    expect(isValidEmail('test @example.com')).to.be.false;
  });

  it('should handle case sensitivity', () => {
    expect(isValidEmail('TEST@EXAMPLE.COM')).to.be.true;
  });
});
