const { ObjectId } = require('mongodb');
const { getCollection } = require('./connection');

const connect = getCollection('products');

const createProduct = async (name, quantity) => {
  const result = await connect
    .then((item) => item.insertOne({ name, quantity }));

  return { _id: result.insertedId, name, quantity };
};

const getProducts = async () => {
  const result = await connect
    .then((item) => item.find({}));

  return result.toArray();
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connect
    .then((products) => products)
    .then((product) => product.findOne({ _id: ObjectId(id) }));

  return result;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connect
    .then((item) => item.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return { _id: result.insertedId, name, quantity };
};

const deleteProduct = async (id) => {
  const products = await connect.then((product) => product);

  return products.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
