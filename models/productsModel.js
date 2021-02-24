const connection = require('./connection');
const { ObjectId } = require('mongodb');

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
  const product = { '_id': ObjectId(), ...data };
  const { name, quantity } = data;
  
  const SIX = 6;
  if (name.length < SIX) {
    error.err.message = '"name" length must be at least 5 characters long';
    return res.status(status_ue).json(error);
  }
  
  if (typeof(quantity) === 'string') {
    error.err.message = '"quantity" must be a number';
    return res.status(status_ue).json(error);
  }
  
  const ZERO = 0;
  if (quantity <= ZERO) {
    error.err.message = '"quantity" must be larger than or equal to 1';
    return res.status(status_ue).json(error);
  }
  
  const products = await connection().then((db) => {
    return db.collection('products').find({}).toArray();
  });
  const productsNames = products.map((p) => p.name);
  if (productsNames.includes(name)) {
    error.err.message = 'Product already exists';
    return res.status(status_ue).json(error);
  }
  
  connection().then((db) => db.collection('products').insertOne(product));
  
  return res.status(status_c).json(product);
};

const getProducts = async (_req, res) => {
  const products = await connection().then((db) => {
    return db.collection('products').find({}).toArray();
  });

  return res.status(status_s).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.message = 'Wrong id format';
    return res.status(status_ue).json(error);
  }

  const product = await connection().then((db) => {
    return db.collection('products').findOne(ObjectId(id));
  });

  return res.status(status_s).json(product);
};

module.exports = {
  saveProduct,
  getProducts,
  getProductById,
};
