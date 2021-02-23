const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAllProducts = async () => {
  const products = await connection('products');

  return await products.find().toArray();
};

const getAProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const product = connection('products')
    .then((products) => products.findOne(ObjectId(id)));

  return product;
};

const getAProductByName = async (name) => {
  const product = await connection('products')
    .then((products) => products.findOne({ name }));
  console.log(name);
  console.log(product);
  return product;
};

const createAProduct = async (name, quantity) => {
  const product = await connection('products')
    .then((products) => products.insertOne({ name, quantity }));
  
  return { _id: product.insertedId, name, quantity };
};

const updateAProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  await connection('products').then((products) => {
    products.updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }});
  });

  const updatedProduct = {
    _id: ObjectId(id),
    name,
    quantity, 
  };

  return updatedProduct;
};

const removeAProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const removedProduct = connection('products')
    .then((products) => products.deleteOne({ _id: ObjectId(id)}));

  return removedProduct;
};

module.exports = {
  getAllProducts,
  getAProductById,
  getAProductByName,
  createAProduct,
  updateAProduct,
  removeAProduct
};
