const products = require('../models/products');

const NAME_MIN_SIZE = 5;
const ZERO = 0;

const nameValidation = (name) => name.length > NAME_MIN_SIZE;

const quantityValidation = (quantity) => quantity > ZERO;

const createProduct = async (productName, productQuantity) => {
  const productExists = await products.getByName(productName);

  if (!nameValidation(productName)) 
    return {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    };

  if(!Number.isInteger(productQuantity)) 
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };

  if (!quantityValidation(productQuantity)) 
    return {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  
  if (productExists) 
    return {
      code: 'invalid_data',
      message: 'Product already exists'
    };

  return products.insertProduct(productName, productQuantity);
};

const allProducts = async () => await products.getAll();

const productById = async (id) => await products.getById(id);

module.exports = {
  createProduct,
  allProducts,
  productById,
};