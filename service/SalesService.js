const Sales = require('../model/SalesModel');
const Products = require('./ProductsService');

const getRegisterProducts = async () => {
  const registeredProducts =  await Products.getAll();
  return registeredProducts;
};

const getProductIdAndQuantity = async () => {
  const soldProduct = getRegisterProducts.products.map((product) => ([
    {
      productId: product._id,
      quantity: product.quantity,
    }
  ]));
  console.log('retorno getProductIdAndQuantity', soldProduct);
  return soldProduct;
};

const registerSale = async () => {
  const registeredProductsIdAndQuantity = getProductIdAndQuantity();
  return Sales.registerSale({ itenSold: registeredProductsIdAndQuantity });
};

module.exports = {
  registerSale
};
