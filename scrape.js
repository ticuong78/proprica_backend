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

  await page.goto("https://shopee.vn/Kh%E1%BA%A9u-trang-5d-Kh%E1%BA%A9u-trang-5d-VINAMAX-kh%E1%BA%A9u-trang-5d-TH%E1%BB%8ANH-PH%C3%81T-(-th%C3%B9ng-100-chi%E1%BA%BFc-v%C3%A0-h%E1%BB%99p-50-chi%E1%BA%BFc-)-th%C3%B9ng-100-chi%E1%BA%BFc-i.1039458631.21582337863?publish_id=&sp_atk=7b25ab53-1a7d-4997-9ccd-1f4ce6f0ef81&xptdk=7b25ab53-1a7d-4997-9ccd-1f4ce6f0ef81");

  await page.waitForTimeout(3000);

  await page.screenshot({
    path: "broken.jpg",
    fullPage: true
  })

  await browser.close();
}

requestWebsite();