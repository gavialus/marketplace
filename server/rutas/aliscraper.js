const scrape = require('aliexpress-product-scraper-forker');
const product = scrape('10000008388953');



product.then(res => {
  console.log('The JSON: ', res);
  
  let producto = {
    title: res.title,
    productoId: res.productId
  }
  //console.log(producto)
});