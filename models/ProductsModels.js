const connection = require('./connection');

const registerProduct = async (productInfo) => {
  await connection().then((db) => db.collection('products').insertOne(productInfo));
};

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

module.exports = {
  registerProduct,
  getAllProducts,
};
