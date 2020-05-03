// functions/index.js
const functions = require('firebase-functions');
const faker = require('faker');

// Initialize products array
const products:any[] = [];

// Max number of products
const LIMIT = 100;

// Push a new product to the array
for (let i = 0; i < LIMIT; i++) {
  products.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}

exports.listProducts = functions.https.onCall((data: any, context: any) => {
  return products;
});
