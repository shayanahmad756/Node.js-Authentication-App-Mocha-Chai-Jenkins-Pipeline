const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/**
 * Create and configure WebDriver instance
 * @returns {WebDriver} - Configured WebDriver instance
 */
async function createDriver() {
  const options = new chrome.Options();
  
  // Run in headless mode for CI/CD
  if (process.env.CI || process.env.HEADLESS) {
    options.addArguments('--headless');
  }
  
  // Additional Chrome options
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  
  return driver;
}

/**
 * Quit WebDriver instance
 * @param {WebDriver} driver - WebDriver instance to quit
 */
async function quitDriver(driver) {
  if (driver) {
    await driver.quit();
  }
}

module.exports = {
  createDriver,
  quitDriver
};
