const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const requestWebsite = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: executablePath()
  })

  const page = await browser.newPage();

  await page.goto("https://shopee.vn/%C3%94p-%C4%90i%E1%BB%87n-Tho%E1%BA%A1i-Silicon-D%E1%BA%BBo-H%C3%ACnh-M%E1%BA%B7t-C%C6%B0%E1%BB%9Di-%C4%90%C6%A1n-Gi%E1%BA%A3n-D%E1%BB%85-Th%C6%B0%C6%A1ng-Cho-iphone-12-13-14-pro-max-14-plus-15-7-8plus-x-xr-xsmax-%E1%BB%90p-i.1118446719.17699571375?publish_id=&sp_atk=09cc9d1f-a857-4bf8-a65b-abc1fcb097da&xptdk=09cc9d1f-a857-4bf8-a65b-abc1fcb097da");

  await page.waitForTimeout(3000);

  await page.screenshot({
    path: "broken.jpg",
    fullPage: true
  })

  await browser.close();
}

requestWebsite();