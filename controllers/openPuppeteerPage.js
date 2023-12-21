const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
require("dotenv").config();
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const smallScrape = require('../utilities/smallScrape');
const fullScrape = require('../utilities/fullScrape');
const { errorLog } = require('../utilities/logEvents');
const ErrorCompany = require("../model/errorModels");

const CONFIG = {
  timeout: 3000
}

const openPuppeteerBrowser = async (req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(200);
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath()
  })

  req.browser = browser;
  next();
}

const openPuppeteerPage = async (req, res, next) => {
  const browser = req.browser;
  const page = await browser.newPage();
  req.page = page;
  next();
}

const authenticatePuppeteerPage = async (req, res) => {
  try {
    const page = req.page;
    await page.goto(req.body.url, {
      waitUntil: 'load'
    });

    await page.waitForSelector(".lPNKBu");

    const selector = await page.$$(".lPNKBu");
    if (selector.length != 0) {
      const selectorsUser = selector[0];
      const selectorspassword = selector[1];
      await selectorsUser.type("0355639493", { delay: 100 });
      await selectorspassword.type("Chaulen4", { delay: 100 });
      await selectorspassword.press("Enter");
      await page.waitForNavigation({
        waitUntil: "load"
      })

      try {
        await page.waitForSelector(".dWxniD", { timeout: 3500 });
        await page.click(".dWxniD", { timeout: 200 });
        await page.waitForSelector(".GhFPxQ", { timeout: 2000 });
        await page.click(".GhFPxQ", { timeout: 200 });
      } catch (err) {
        Promise.resolve();
      }

    }
    if (req.path === "/small") {
      const data = await smallScrape(page);
      return res.status(200).send(JSON.stringify(data));
    } else if (req.path === "/full") {
      const data = await fullScrape(page);
      return res.status(200).send(JSON.stringify(data));
    }
  } catch (error) {
    errorLog(`${error.name}\t\t${error.message}`);
    const statusCode = await new ErrorCompany().returnError(error);
    return res.sendStatus(statusCode);
  } finally {

    //dWxniD
    //GhFPxQ 
    await req.browser.close();
  }
}

// const eveluatePuppeteerPage = async (req, res) => {
//   const data = await smallScrape(req.page);
//   await req.browser.close();
//   return res.status(200).send(JSON.stringify(data));
// }

// const fullEveluatePuppeteerPage = async (req, res) => {
//   const data = await fullScrape(req.page);
//   await req.browser.close();
//   return res.status(200).send(JSON.stringify(data));
// }

// await page.goto(req.body.url, {
//   waitUntil: 'load'
// });

// await page.waitForSelector(".pDzPRp");
// await page.waitForSelector(".wyhvVD");

// const selector = await page.$$(".pDzPRp");
// const selectorsUser = selector[0];
// const selectorspassword = selector[1];
// await selectorsUser.type("0355639493", { delay: 200 });
// await selectorspassword.type("Chaulen4", { delay: 200 });
// await selectorspassword.press("Enter");

// const openPuppeteerPage = async (req, res) => { //Thêm xử lý lượng dữ liệu trong một luồng
//   if (req.method === "OPTIONS") return res.sendStatus(200);

//   const browser = await puppeteer.launch({
//     headless: 'new',
//     executablePath: executablePath()
//   })

//   const page = await browser.newPage();

//   try {
//     await page.goto(req.body.url, {
//       waitUntil: 'load'
//     });

//     const cookie = req?.headers?.cookie;
//     if (!cookie) {
//       const token = require('crypto').randomBytes(64).toString('hex');
//       res.cookie('accessCookie', token, { secure: true, maxAge: 15 * 60 * 1000, sameSite: false });
//       const data = await smallScrape(page, CONFIG);
//       res.status(200).send(JSON.stringify(data));
//     } else if (cookie.startsWith("accessCookie=")) {
//       const accessCookie = req?.headers?.cookie?.split("=")[1];
//       if (!accessCookie) return res.sendStatus(401);
//       const models = await fullScrape(page);
//       res.status(200).send(JSON.stringify(models));
//     }
//   } catch (error) {
//     errorLog(`${error.name}\t\t${error.message}`);
//     const statusCode = await new ErrorCompany().returnError(error);
//     return res.sendStatus(statusCode);
//   } finally {
//     await browser.close();
//   }
// }

module.exports = { openPuppeteerBrowser, openPuppeteerPage, authenticatePuppeteerPage };
