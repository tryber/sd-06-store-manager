const ProductsModel = require('../models/ProductsModel');

const insertProduct = async (product) => {
  const newId = await ProductsModel.insertProduct(product);
  const { name, quantity } = product;
  return {
    _id: newId,
    name,
    quantity,
  };
};

const validateFields = async (product) => {
  const code = 'invalid_data';
  const status = false;
  const MIN_CHARS = 5;
  const ONE = 1;

  if (product.name.length < MIN_CHARS) return { 
    status, code, httpcode: 422, msg: '"name" length must be at least 5 characters long' 
  };
  
  if (typeof product.quantity !== 'number') return { 
    status, code, httpcode: 422, msg: '"quantity" must be a number' 
  };

  if (parseInt(product.quantity) < ONE) return { 
    status, code, httpcode: 422, msg: '"quantity" must be larger than or equal to 1' 
  };

  if (product.name) {
    const nameExists = await ProductsModel.findByName(product.name);
    if (nameExists) return { 
      status, code, httpcode: 422, msg: 'Product already exists' 
    };
  }

  return { status: true };
};

module.exports = {
  insertProduct,
  validateFields,
};