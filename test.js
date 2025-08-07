// tests/logo.test.js
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Wiki.js Setup Page – Logo (Remote)', function () {
  let driver;
  this.timeout(30000);

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');              // Run Chrome in headless mode
    options.addArguments('--no-sandbox');            // Required for running in some Linux environments
    options.addArguments('--disable-dev-shm-usage'); // Fixes limited resource problems in Docker/Linux

    driver = await new Builder()
      .usingServer('http://selenium:4444/wd/hub')  // Your Selenium Grid URL
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('http://15.156.144.245:8082'); // Update with your EC2 public IP and port
    await driver.wait(until.elementLocated(By.css('img.setup-logo')), 10000);
  });

  after(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should display the Wiki.js logo', async () => {
    const logo = await driver.findElement(By.css('img.setup-logo'));
    const src = await logo.getAttribute('src');
    expect(src).to.match(/logo-wikijs-full\.svg$/);
  });
});

