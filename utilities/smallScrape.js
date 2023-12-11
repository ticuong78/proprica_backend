const smallScrape = async (page, config) => {
  const nameSelector = await page.waitForSelector("._44qnta span", config);
  const shopSelector = await page.waitForSelector(".VlDReK", config);
  const priceSelector = await page.waitForSelector(".pqTWkA", config);
  const imageSelector = await page.waitForSelector("._7D4JtJ", config);

  const shop = await page.evaluate(selector => selector.innerText, shopSelector);
  const image = await page.evaluate(selector => selector.getAttribute("src"), imageSelector);
  const name = await page.evaluate(selector => selector.innerText, nameSelector);
  const price = await page.evaluate(selector => selector.innerText, priceSelector);

  return { shop, image, name, price };
}

module.exports = smallScrape;