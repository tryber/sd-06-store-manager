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

  return product;
};

const updateProductById = async (name, quantity, id) => {
  const product = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );

  return product;
};

module.exports = {
  createProduct,
  searchProducts,
  searchProduct,
  updateProductById
};
