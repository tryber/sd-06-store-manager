const { ObjectId } = require('mongodb');

const getCollection = require('./connection');

const getAllProducts = async () => { 
  return getCollection('products').then((product) => product.find().toArray());
};

const getByIdProduct = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return getCollection('products').then((product) => product.findOne(ObjectId(id)));
};

const createProduct = async ({ name, quantity }) => {
  const product = await getCollection('products').then((product) =>
    product.insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  // if(!ObjectId.isValid(id)) return null;
  console.log(id, name, quantity);
  const product = await getCollection('products').then((product) =>
    product.updateOne({ _id: ObjectId(id)}, { $set: { name, quantity}}));

  return product;
};

const getByNameAndQuantity = async ({ name, quantity }) => {
  return getCollection('products').then((product) => product.findOne({ name, quantity }));
};

const getByName = async ({ name }) => {
  return getCollection('products').then((product) => product.findOne({name}));
};

const excludeProduct = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return getCollection('products').then((product) => {
    return product.deleteOne({ _id: ObjectId(id)});
  });
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
  getByNameAndQuantity,
  getByName,
  excludeProduct,
};