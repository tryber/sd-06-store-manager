const Sales = require('../models/Sales');
const Products = require('../models/Products');

const stockUpdate = async (arrSale) => {
  arrSale.forEach(async (sale) => {
    await Products.updateStock(sale.productId, sale.quantity);
  });
};

const saleUpdateStock = async (id, arrSale) => {
  const findSales = await Sales.findById(id);
  arrSale.forEach(async (sale) => {
    const itenToSale = findSales.itensSold.filter((found) => 
      found.productId === sale.productId);
    
    if (itenToSale) {
      const value = itenToSale.quantity - sale.quantity;
      await Products.updateStock(sale.productId, value);
    }
  });
};

const deleteStock = async (arrSale) => {
  arrSale.itensSold.forEach(async (sale) => {
    const value = -sale.quantity;
    await Products.updateStock(sale.productId, value);
  });
};

module.exports = {
  stockUpdate,
  saleUpdateStock,
  deleteStock,
};