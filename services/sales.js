const { ObjectId } = require('mongodb');
const sales = require('../models/sales');
const products = require('../models/products');
const { TestWatcher } = require('jest');
const ZERO = 0;

const createSale = async (allSales) => {
  const verifySale = allSales.map(async (sale) => {
    const productOk = ObjectId.isValid(sale.productId);
    if (!productOk) {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
    const verifyProduct = await products.getProductById(sale.productId);
    if (!verifyProduct || sale.quantity <= ZERO || typeof sale.quantity !== 'number') {
      throw {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
    }
    if (sale.quantity > verifyProduct.quantity) {
      throw {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
    }
    return allSales;
  });
  await Promise.all(verifySale);
  return sales.createSale(allSales);
};

const showSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  const saleById = await sales.showSaleById(id);
  if (!saleById) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  return saleById;
};

const updateSale = async (id, productId, quantity) => {
  const saleExists = await sales.showSaleById(id);
  if(!saleExists) {
    throw {
      code: 'not_found',
      message: 'Sale not found',
    };
  }
  const productOk = ObjectId.isValid(productId);
  if(!productOk) {
    throw {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  const productExists = await products.getProductById(productId);
  if (!productExists || quantity <= ZERO || typeof quantity !== 'number') {
    throw {
      code: 'invalid_code',
      message: 'Wrong product ID or invalid quantity',
    };
  }
  if (quantity > productExists.quantity) {
    throw {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    };
  }
  await sales.updateSale(id, productId, quantity);
  return { _id: id, itensSold: [{ productId, quantity }]};
};

module.exports = {
  createSale,
  showSaleById,
  updateSale,
};
