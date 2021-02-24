const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const {
  verifyQuantity,
} = require('../aux/verifications');

const status_ue = 422;
const status_c = 201;
const status_s = 200;
const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const saveProduct = async (req, res) => {
  const data = req.body;
  const { name, quantity } = data;
  
  const SIX = 6;
  if (name.length < SIX) {
    error.err.message = '"name" length must be at least 5 characters long';
    return res.status(status_ue).json(error);
  }

  const vQuantity = verifyQuantity(quantity);
  if (!vQuantity.isValid) return res.status(vQuantity.status).json(vQuantity.error);
  
  const products = await Products.getAll();

  const productsNames = products.map((p) => p.name);
  if (productsNames.includes(name)) {
    error.err.message = 'Product already exists';
    return res.status(status_ue).json(error);
  }
  
  const product = { '_id': ObjectId(), ...data };
  await Products.create(product);

  return res.status(status_c).json(product);
};

const getProducts = async (_req, res) => {
  const products = await Products.getAll();

  if (!products) {
    error.err.message = 'Couldn\'t find any product';
    return res.status(status_ue).json(error);
  }

  return res.status(status_s).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(status_ue).json(error);
  }

  const product = await Products.find(id);

  return res.status(status_s).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { name, quantity } = data;

  const SIX = 6;
  if (name.length < SIX) {
    error.err.message = '"name" length must be at least 5 characters long';
    return res.status(status_ue).json(error);
  }

  const vQuantity = verifyQuantity(quantity);
  if (!vQuantity.isValid) return res.status(vQuantity.status).json(vQuantity.error);

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(status_ue).json(error);
  }

  const updatedProduct = await Products.update(id, name, quantity);

  if (!updatedProduct) {
    error.err.message = 'Product not found';
    return res.status(status_ue).json(error);
  }

  return res.status(status_s).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(status_ue).json(error);
  }

  const productToDelete = await Products.find(id);

  await Products.remove(id);

  return res.status(status_s).json(productToDelete);
};

module.exports = {
  saveProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
