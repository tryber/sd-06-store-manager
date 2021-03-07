const ProductsService = require('../service/ProductsService');
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

module.exports = {
  updateProductQuantity,
};
