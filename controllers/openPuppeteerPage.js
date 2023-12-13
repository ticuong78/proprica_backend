const puppeteer = require('puppeteer-extra');
const { executablePath } = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const smallScrape = require('../utilities/smallScrape');
const fullScrape = require('../utilities/fullScrape');
const { errorLog } = require('../utilities/logEvents');
const ErrorCompany = require("../model/errorModels");

const CONFIG = {
  timeout: 5000
}

const openPuppeteerPage = async (req, res) => { //Thêm xử lý lượng dữ liệu trong một luồng
  if (req.method === "OPTIONS") return res.sendStatus(200);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: executablePath()
  })

  const page = await browser.newPage();

  try {
    await page.goto(req.body.url, {
      waitUntil: 'load'
    });

    const cookie = req?.headers?.cookie;
    if (!cookie) {
      const token = require('crypto').randomBytes(64).toString('hex');
      res.cookie('accessCookie', token, { secure: true, maxAge: 15 * 60 * 1000, sameSite: false });
      const data = await smallScrape(page, CONFIG);
      res.status(200).send(JSON.stringify(data));
    } else if (cookie.startsWith("accessCookie=")) {
      const accessCookie = req?.headers?.cookie?.split("=")[1];
      if (!accessCookie) return res.sendStatus(401);
      const models = await fullScrape(page);
      res.status(200).send(models);
    }
  } catch (error) {
    errorLog(`${error.name}\t\t${error.message}`);
    const statusCode = new ErrorCompany().returnError(error);
    return res.sendStatus(statusCode);
  } finally {
    await browser.close();
  }
}

module.exports = { openPuppeteerPage };
