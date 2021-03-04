const { ObjectId } = require('mongodb');
const Products = require('../models/Products');
const Sales = require('../models/Sales');

const status_ue = 422;
const status_c = 201;
const status_s = 200;
const status_nf = 404;
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
  const ids = data.map(s => s.productId);
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

  await Sales.create(sales);

  // new logic
  const productToSale = products.find((product) => {
    return data.map(p => p.productId == product._id);
  });

  const { _id, name, quantity } = productToSale;
  await Products.update(_id, name, quantity - data[0].quantity);

  return res.status(status_s).json(sales);
};

const getSales = async (_req, res) => {
  const sales = await Sales.getAll();

  if (!sales) {
    error.err.code = 'not_found';
    error.err.message = 'Sale not found';

    return res.status(status_nf).json(error);
  }

  return res.status(status_s).json({ sales });
};

const getSale = async (req, res) => {
  const { id } = req.params;
  
  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.code = 'not_found';
    error.err.message = 'Sale not found';
    
    return res.status(status_nf).json(error);
  }
  
  const sale = await Sales.find(id);
  
  if (!sale) {
    error.err.code = 'not_found';
    error.err.message = 'Sale not found';

    return res.status(status_nf).json(error);
  }

  return res.status(status_s).json(sale);
};

const updateSale = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  error.err.code = 'invalid_data';
  
  if (!data) {
    error.err.message = 'Couldn\'t find any sale';
    return res.status(status_ue).json(error);
  }

  const sales = await Sales.getAll();
  const salesIds = sales.map(s => s.productId);
  const validId = salesIds.includes(data.productId);

  const ZERO = 0;
  const validQuantity = data.every((s) => {
    return s.quantity > ZERO && typeof(s.quantity) === 'number';
  });
  
  if (!validQuantity || !validId) {
    error.err.message = 'Wrong product ID or invalid quantity';
    return res.status(status_ue).json(error);
  }

  // logic to update in case the request comes with more than one item
  let bigSale = await Sales.find(id);
  let itemsSold = bigSale.itensSold;
  const saleToUpdate = itemsSold.find((s, i) => s.productId === data[i].productId);
  const newSale = data.find(s => s.productId === saleToUpdate.productId);
  const updatedItemsSold = itemsSold.filter(s => s.productId !== saleToUpdate.productId);
  await Sales.update(id, [...updatedItemsSold, newSale]);
  const updatedSale = await Sales.find(id);

  return res.status(status_s).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const validId = ObjectId.isValid(id);
  if (!validId) {
    error.err.code = 'invalid_data';
    error.err.message = 'Wrong sale ID format';

    return res.status(status_ue).json(error);
  }

  const saleToDelete = await Sales.find(id);

  // new logic
  const productToUpdate = await Products.find(saleToDelete.itensSold[0].productId);
  const { _id, name, quantity } = productToUpdate;

  await Products.update(_id, name, quantity + saleToDelete.itensSold[0].quantity);

  await Sales.remove(id).then(() => {
    return res.status(status_s).json(saleToDelete);
  });
};

module.exports = {
  createSale,
  getSale,
  getSales,
  updateSale,
  deleteSale,
};
