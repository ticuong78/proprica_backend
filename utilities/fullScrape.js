const fullScrape = async (page) => {
  const rawResponse = await page.waitForResponse(response => response.url().includes("https://shopee.vn/api/v4/pdp/get_pc?shop_id"), {
    waitUntil: 'load'
  });
  const response = await rawResponse.json();
  const models = await response.data.item.models.map(item => {
    return {
      name: item.name,
      stock: item.stock,
      price: item.price
    }
  })

  const tierSelector = await response.data.item['tier_variations'];

  const tierName = tierSelector.name;
  const images = tierSelector.images;

  const newModels = await models.map((item, index) => {
    return { ...item, image: `https://down-vn.img.susercontent.com/file/${images[index]}` }
  })


  console.log(newModels);

  return { tierName, newModels };
}

module.exports = fullScrape