const connection = require('../database');
const { ObjectId } = require('mongodb');

const createProduct = async ({ name, quantity }) => {
  const newProduct = connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return newProduct;
};

const searchProducts = async () => {
  const allProduct = connection().then((db) =>
    db.collection('products').find().toArray()
  );

  return allProduct;
};

const searchProduct = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) })
  );

  console.log(product, id);
  return product;
};

module.exports = {
  createProduct,
  searchProducts,
  searchProduct
};
