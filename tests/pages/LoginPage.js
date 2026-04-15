const { By } = require('selenium-webdriver');

/**
 * Page Object Model for Login Page
 */
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Locators
    this.emailInput = By.id('email');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('loginBtn');
    this.messageElement = By.id('message');
    this.signupLink = By.css('a[href="signup.html"]');
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.driver.get(`${this.baseUrl}/login.html`);
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
   * Click login button
   */
  async clickLogin() {
    const loginBtn = await this.driver.findElement(this.loginButton);
    await loginBtn.click();
  }

  /**
   * Perform complete login action
   * @param {string} email - Email to login with
   * @param {string} password - Password to login with
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
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
   * Click signup link
   */
  async clickSignupLink() {
    const signupLink = await this.driver.findElement(this.signupLink);
    await signupLink.click();
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

module.exports = LoginPage;
