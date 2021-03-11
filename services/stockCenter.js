const Sales = require('../models/Sales');
const Products = require('../models/Products');

const stockUpdate = async (arrSale) => {
  arrSale.forEach(async (sale) => {
    await Products.updateQuantity(sale.productId, sale.quantity);
  });
};

const saleUpdateStock = async (id, arrSale) => {
  const findSales = await Sales.findById(id);
  arrSale.forEach(async (sale) => {
    const itensSold = findSales.itensSold.filter((found) => 
      found.productId === sale.productId);

    if (itensSold) {
      const value = itensSold.quantity - sale.quantity;
      await Products.updateQuantity(sale.productId, value);
    }
  });
};

const deleteStock = async (arrSale) => {
  arrSale.itensSold.forEach(async (sale) => {
    const value = -sale.quantity;
    await Products.updateQuantity(sale.productId, value);
  });
};

module.exports = {
  stockUpdate,
  saleUpdateStock,
  deleteStock,
}; 