const ProductsService = require('../service/ProductsService');
const SalesService = require('../service/SalesService');
const NOT_FOUND = 404;
const ZERO = 0;

const updateProductQuantity = async (req, res, next) => {
  const products = req.body;

  products.map(async (item) => {
    const { productId, quantity } = item;
    const product = await ProductsService.getById(productId);
    const updatedProductQuantity = {
      name: product.name,
      quantity: product.quantity - quantity 
    };

    if (updatedProductQuantity.quantity < ZERO) {
      return res.status(NOT_FOUND).json({err: { 
        code: 'stock_problem',  
        message: 'Such amount is not permitted to sell' 
      } });
    }

    await ProductsService.updateProduct(productId, updatedProductQuantity);
  });
  next();
};

const updateDeletedSales = async (req, res, next) => {
  const { id } = req.params;
  const arrSales = await SalesService.getById(id);
  arrSales.itensSold.map(async (item) => {
    const { productId, quantity } = item;
    const product = await ProductsService.getById(productId);
    const updateProduct = {
      name: product.name,
      quantity: product.quantity + quantity
    };

    await ProductsService.updateProduct(productId, updateProduct);
  });
  next();
};

module.exports = {
  updateProductQuantity,
  updateDeletedSales
};
