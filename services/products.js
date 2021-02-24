const products = require('../models/products');

const minNameLength = 5;
const nullQuantity = 0;
const idMongoLength = 24;
const nameLengthErrorMessage = '"name" length must be at least 5 characters long';
const nameExists = 'Product already exists';
const quantityErrorMessage = '"quantity" must be larger than or equal to 1';
const quantityTypeErrorMessage = '"quantity" must be a number';

const isValid = async (name, quantity) => {
  if (name.length < minNameLength) return nameLengthErrorMessage;
  if (!Number.isInteger(quantity)) return quantityTypeErrorMessage;
  if (quantity <= nullQuantity) return quantityErrorMessage;

  return true;
};

const isUnique = async (name) => {
  const checkUnique = await products.findByName(name);

  if (checkUnique) return nameExists;

  return true;
};

const getAll = async () => {
  const productsArray = await products.getAll();

  return productsArray;
};

const findById = async (id) => {
  const errorObject = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };


  if (id.length !== idMongoLength) return errorObject;

  const product = await products.findById(id);

  if (!product) return errorObject;
  
  return product;
};

const create = async (productName, quantity) => {
  const validOrErrorMessage = isValid(productName, quantity);
  const isUniqueOrError = await isUnique(productName);
  if (validOrErrorMessage !== true) return {
    err: {
      code: 'invalid_data',
      message: validOrErrorMessage,
    }
  };

  if (isUniqueOrError !== true) return {
    err: {
      code: 'invalid_data',
      message: isUniqueOrError,
    }
  };

  const { insertedId } = await products.create({ name: productName, quantity });

  return {
    _id: insertedId,
    name: productName,
    quantity
  };
};

const update = async (id, updateProduct) => {
  const { name, quantity } = updateProduct;
  const validOrErrorMessage = await isValid(name, quantity);

  if (validOrErrorMessage !== true) return {
    err: {
      code: 'invalid_data',
      message: validOrErrorMessage,
    }
  };

  const updatedProduct = await products.update(id, name, quantity);

  return updatedProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};