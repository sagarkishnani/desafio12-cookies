import faker from "faker";
faker.locale = "es";

function createNFakeProducts(n) {
  let products = [];

  for (let id = 1; id <= n; id++) {
    let title = faker.commerce.product();
    let price = faker.commerce.price();
    let thumbnail = faker.image.imageUrl();

    products.push({
      id: id,
      title: title,
      price: price,
      thumbnail: thumbnail,
    });
  }
  return products;
}

function createFakeProduct(id) {}

export { createFakeProduct, createNFakeProducts };
