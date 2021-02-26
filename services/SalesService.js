const Sales = require('../models/Sales');
const Products = require('../models/Products');

const updateQuantity = async (arrSale) => {
  arrSale.forEach(async (sale) => {
    await Products.updateProductQuantity(sale.productId, sale.quantity);
  });
  console.log('entrou');
};

const updateQuantityOfSale = async (id, arrSale) => {
  const foundSales = await Sales.findById(id);
  arrSale.forEach(async (sale) => {
    const itenSold = foundSales.itensSold
      .filter((found) => found.productId === sale.productId);
    if (itenSold) {
      const value = itenSold.quantity - sale.quantity;
      await Products.updateProductQuantity(sale.productId, value);
    }
  });
};

const updateDelete = async (arrSale) => {
  arrSale.itensSold.forEach(async (sale) => {
    const value = -sale.quantity;
    await Products.updateProductQuantity(sale.productId, value);
  });
};

module.exports = {
  updateQuantity,
  updateQuantityOfSale,
  updateDelete,
};
