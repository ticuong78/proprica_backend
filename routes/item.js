const express = require('express');
const router = express.Router();
const puppeteer = require('../controllers/openPuppeteerPage')

router.post('/*', [puppeteer.openPuppeteerBrowser, puppeteer.openPuppeteerPage, puppeteer.authenticatePuppeteerPage])

module.exports = router;