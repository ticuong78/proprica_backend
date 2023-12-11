const express = require('express');
const router = express.Router();
const puppeteer = require('../controllers/openPuppeteerPage')

router.post('/', puppeteer.openPuppeteerPage);

module.exports = router;