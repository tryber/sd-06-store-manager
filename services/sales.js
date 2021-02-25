const { ObjectId } = require('mongodb');
const sales = require('../models/sales');
const products = require('../models/products');
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

module.exports = {
  createSale,
};
