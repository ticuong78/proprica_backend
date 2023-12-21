const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const requestWebsite = async (browser) => {

  // console.log(browser);

  const page = await browser.newPage();

  await page.goto("https://shopee.vn/Badge-Huy-hi%E1%BB%87u-Genshin-Impact-i.288259802.22560372497?publish_id=&sp_atk=63dc5216-616b-409f-b949-cb34932c55ec&xptdk=63dc5216-616b-409f-b949-cb34932c55ec");

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