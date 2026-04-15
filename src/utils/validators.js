/**
 * Validation utility functions for user input
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} - True if username is valid
 */
const isValidUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  return username.length >= 3 && username.length <= 50;
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @returns {boolean} - True if password is valid
 */
const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
};

module.exports = {
  isValidEmail,
  isValidUsername,
  isValidPassword
};
