// tests/logo.test.js
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Wiki.js Setup Page – Logo (Remote)', function () {
  let driver;
  this.timeout(30000);

  before(async () => {
    driver = await new Builder()
      .usingServer('http://selenium:4444/wd/hub') // Selenium Grid
      .forBrowser('chrome')
      .build();

    await driver.get('http://15.156.144.245:8082'); // Your EC2 IP
    await driver.wait(until.elementLocated(By.css('img.setup-logo')), 10000);
  });

  after(() => driver && driver.quit());

  it('should display the Wiki.js logo', async () => {
    const logo = await driver.findElement(By.css('img.setup-logo'));
    const src = await logo.getAttribute('src');
    expect(src).to.match(/logo-wikijs-full\.svg$/);
  });
});
