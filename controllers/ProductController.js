const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const {
  verifyQuantity,
} = require('../middlewares/verifications');

const charactersSix = 6;
const zero = 0;
const success = 200;
const UnprocessableEntity = 422;
const successCreated = 201;

const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const createProduct = async (req, res) => {
  const data = req.body;
  const { name, quantity } = data;

  if(name.length < charactersSix) {
    error.err.message = '\"name\" length must be at leas 5 characters long';
    return res.status(UnprocessableEntity).json(error);
  };

  if(quantity <= zero) {
    error.err.message = '"quantity" must be larger than or equal to 1';
    return res.status(UnprocessableEntity).json(error);
  };

  if(typeof(quantity) === String) {
    error.err.message = '"quantity" must be a number';
    return res.status(UnprocessableEntity).json(error);
  };

  const getProducts = async (_req, res) => {
    const products = await Products.getAll();

    if (!products) {
      error.err.message = 'Couldn\'t find any product';
      return res.status(UnprocessableEntity).json(error);
    }
  };

  const vQuantity = verifyQuantity(quantity);
  if (!vQuantity.isValid) return res.status(vQuantity.status).json(vQuantity.error);

  const products = await Products.getAll();

  const productsNames = products.map((p) => p.name);
  if (productsNames.includes(name)) {
    error.err.message = 'Product already exists';
    return res.status(UnprocessableEntity).json(error);
  }

  const product = { '_id': ObjectId(), ...data };
  await Products.create(product);

  return res.status(successCreated).json({ product });
};

const getProducts = async (_req, res) => {
  const products = await Products.getAll();

  if (!products) {
    error.err.message = 'Couldn\'t find any product';
    return res.status(UnprocessableEntity).json(error);
  }

  return res.status(success).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(UnprocessableEntity).json(error);
  }

  const product = await Products.find(id);

  return res.status(success).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const { name, quantity } = data;

  const SIX = 6;
  if (name.length < SIX) {
    error.err.message = '"name" length must be at least 5 characters long';
    return res.status(UnprocessableEntity).json(error);
  }

  const vQuantity = verifyQuantity(quantity);
  if (!vQuantity.isValid) return res.status(vQuantity.status).json(vQuantity.error);

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(UnprocessableEntity).json(error);
  }

  const updatedProduct = await Products.update(id, name, quantity);

  if (!updatedProduct) {
    error.err.message = 'Product not found';
    return res.status(UnprocessableEntity).json(error);
  }

  return res.status(success).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(UnprocessableEntity).json(error);
  }

  const productToDelete = await Products.find(id);

  await Products.remove(id);

  return res.status(success).json(productToDelete);
};

module.exports = {
  getProducts,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
