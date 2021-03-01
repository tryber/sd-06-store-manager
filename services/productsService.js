const products = require('../models/products');

const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameValidation = (name) => name.length > NAME_MIN_SIZE;

const quantityValidation = (quantity) => quantity > ZERO;

const createProduct = async (productName, productQuantity) => {
  const isUnique = await products.getByName(productName) === null;
  
  if (isUnique) return products.insertProduct(productName, productQuantity);

  return false;
};

const allProducts = async () => await products.getAll();

module.exports = {
  nameValidation,
  quantityValidation,
  createProduct,
  allProducts,
};