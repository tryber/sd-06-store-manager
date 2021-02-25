const Product = require('../models/Product');

async function getAll() {
  const products = await Product.getAll();
  return {
    products: products,
  };
}

async function findById(id) {
  const product = await Product.findById(id);

  if (!product) return {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong id format',
    },
  };

  return product;
}

async function findByName(name) {
  const product = await Product.findByName(name);
  return product;
}

async function create(name, quantity) {
  const registeredProduct = await Product.create(name, quantity);
  return registeredProduct;
}

async function update(id, name, quantity) {
  const updatedProduct = await Product.update(id, name, quantity);

  if (!updatedProduct) return {
    error: {
      message: 'Product not updated',
      code: 404,
    }
  };

  return updatedProduct;
}

async function remove(id) {
  const removedProduct = await Product.remove(id);

  if (!removedProduct) return {
    error: {
      message: 'Product not removed',
      code: 404,
    }
  };

  return removedProduct;
}

module.exports = {
  getAll,
  create,
  findById,
  findByName,
  update,
  remove,
};
