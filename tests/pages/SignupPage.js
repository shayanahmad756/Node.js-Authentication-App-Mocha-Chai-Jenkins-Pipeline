const { By } = require('selenium-webdriver');

/**
 * Page Object Model for Signup Page
 */
class SignupPage {
  constructor(driver) {
    this.driver = driver;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Locators
    this.usernameInput = By.id('username');
    this.emailInput = By.id('email');
    this.passwordInput = By.id('password');
    this.signupButton = By.id('signupBtn');
    this.messageElement = By.id('message');
    this.loginLink = By.css('a[href="login.html"]');
  }

  /**
   * Navigate to signup page
   */
  async navigate() {
    await this.driver.get(`${this.baseUrl}/signup.html`);
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    const usernameField = await this.driver.findElement(this.usernameInput);
    await usernameField.clear();
    await usernameField.sendKeys(username);
  }

  /**
   * Enter email
   * @param {string} email - Email to enter
   */
  async enterEmail(email) {
    const emailField = await this.driver.findElement(this.emailInput);
    await emailField.clear();
    await emailField.sendKeys(email);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    const passwordField = await this.driver.findElement(this.passwordInput);
    await passwordField.clear();
    await passwordField.sendKeys(password);
  }

  /**
   * Click signup button
   */
  async clickSignup() {
    const signupBtn = await this.driver.findElement(this.signupButton);
    await signupBtn.click();
  }

  /**
   * Perform complete signup action
   * @param {string} username - Username to signup with
   * @param {string} email - Email to signup with
   * @param {string} password - Password to signup with
   */
  async signup(username, email, password) {
    await this.enterUsername(username);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignup();
  }

  /**
   * Get message text
   * @returns {Promise<string>} - Message text
   */
  async getMessage() {
    const messageEl = await this.driver.findElement(this.messageElement);
    return await messageEl.getText();
  }

  /**
   * Get message color
   * @returns {Promise<string>} - Message color
   */
  async getMessageColor() {
    const messageEl = await this.driver.findElement(this.messageElement);
    return await messageEl.getCssValue('color');
  }

  /**
   * Click login link
   */
  async clickLoginLink() {
    const loginLink = await this.driver.findElement(this.loginLink);
    await loginLink.click();
  }

  /**
   * Wait for message to appear
   */
  async waitForMessage(timeout = 5000) {
    await this.driver.wait(async () => {
      const message = await this.getMessage();
      return message && message.length > 0;
    }, timeout);
  }
}

module.exports = SignupPage;
