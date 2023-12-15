const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const requestWebsite = async (browser) => {

  // console.log(browser);

  const page = await browser.newPage();

  await page.goto("https://shopee.vn/Hi%CC%80nh-da%CC%81n-nh%C3%A2n-v%C3%A2%CC%A3t-game-Genshin-ch%C3%A2%CC%81t-li%C3%AA%CC%A3u-nh%C6%B0%CC%A3a-Acrylic-2cm*1cm(-kh%C3%B4ng-k%C3%A8m-keo-d%C3%A1n)-i.875549904.22860782295");

  await page.waitForSelector(".pDzPRp");
  await page.waitForSelector(".wyhvVD");

  const selector = await page.$$(".pDzPRp");
  const selectorsUser = selector[0];
  const selectorspassword = selector[1];
  await selectorsUser.type("0776199627", { delay: 200 });
  await selectorspassword.type("151004Abyss", { delay: 200 });
  await selectorspassword.press("Enter");

  await page.waitForTimeout(5000);

  await page.screenshot({
    path: "broken.jpg",
    fullPage: true
  })

  await browser.close();
}

puppeteer.launch({
  headless: false,
  executablePath: executablePath()
}).then(browser => requestWebsite(browser));