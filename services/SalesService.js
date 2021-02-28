const Sale = require('../models/Sale');

async function getAll() {
  const sales = await Sale.getAll();
  return {
    sales: sales,
  };
}

async function findById(id) {
  const sale = await Sale.findById(id);

  if(!sale) return {
    'err': {
      'code': 'not_found',
      'message': 'Sale not found',
    },
  };

  return sale;
}

async function create(productsSold) {
  const registeredSale = await Sale.create(productsSold);
  return registeredSale;
}

async function update(id, productsSold) {
  const updatedSale = await Sale.update(id, productsSold);

  if (!updatedSale) return {
    error: {
      message: 'Sale not updated',
      code: 404,
    }
  };

  return updatedSale;
}

async function remove(id) {
  const removedSale = await Sale.remove(id);

  if (!removedSale) return {
    error: {
      message: 'Sale not removed',
      code: 404,
    }
  };

  return removedSale;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};