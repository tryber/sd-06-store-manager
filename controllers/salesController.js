const connection = require('../models/connection');
const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const status_ue = 422;
const status_c = 201;
const status_s = 200;
const error = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const createSale = async (req, res) => {
  const data = req.body;
  
  if (!data) {
    error.err.message = 'Couldn\'t find any product';
    return res.status(status_ue).json(error);
  }

  const products = await Products.getAll();
  
  const productsIds = products.map(p => p._id.toString());
  const ids = data.map(p => p.productId);
  const validId = ids.every(id => productsIds.includes(id));

  const ZERO = 0;
  const validQuantity = data.every((s) => {
    return s.quantity > ZERO && typeof(s.quantity) === 'number';
  });
  
  if (!validQuantity || !validId) {
    error.err.message = 'Wrong product ID or invalid quantity';
    return res.status(status_ue).json(error);
  }

  const sales = {
    _id: ObjectId(),
    itensSold: [],
  };

  data.map(async (p) => {
    sales.itensSold.push(p);
    const name = products.find(e => e._id.toString() === p.productId).name;
    await Products.update(p.productId, name, p.quantity);
  });

  return res.status(status_s).json(sales);
};

module.exports = {
  createSale,
};
