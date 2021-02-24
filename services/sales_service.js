const sales = require('../models/sales');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  return await sales.getAll();
};

const findByIdSales = async (id) => {
  const TFOUR = 24;
  const item = (id.length < TFOUR) ? undefined : await sales.findById(id);

  if(!item) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  };

  return item;
};

const createSale = async (products) => {
  const ZERO = 0;

  const validation = products
    .some(elem => (elem.quantity <= ZERO || typeof elem.quantity !== 'number'));

  if(validation) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  return await sales.create(products);
};

const updateSale = async (id, itensSold) => {
  const ZERO = 0;

  const validation = itensSold
    .some(elem => (elem.quantity <= ZERO || typeof elem.quantity !== 'number'));

  if(validation) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  return await sales.update(id, itensSold);
};

const deleteSale = async (id) => {
  if(!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  };

  return await sales.remove(id);
};

module.exports = {
  getAllSales,
  findByIdSales,
  createSale,
  updateSale,
  deleteSale,
};
