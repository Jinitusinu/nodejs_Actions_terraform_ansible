import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { expect } from 'chai';

describe('Wiki.js Setup Page – Logo (Remote)', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .usingServer('http://15.156.144.245:4444/wd/hub')  // example: replace with your actual Selenium server IP
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build(); 

    await driver.get('http://15.156.144.245:8082');
    await driver.wait(until.elementLocated(By.css('img.setup-logo')), 10000);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should display the Wiki.js logo', async () => {
    const logo = await driver.findElement(By.css('img.setup-logo'));
    const src = await logo.getAttribute('src');
    expect(src).to.match(/logo-wikijs-full\.svg$/);
  });
});
