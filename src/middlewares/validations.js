const { ObjectId } = require('mongodb');
const ProductService = require('../service/ProductService');
const errorMessages = require('../dictionary/errorMessages');
const codeMessages = require('../dictionary/codeMessages');
const statusCodes = require('../dictionary/statusCodes');



const validateName = async (request, response, next) => {
  const product = request.body;
  const MAXIMUM_LENGTH = 5;
  const MINIMUM_LENGTH = 0;

  if (product.name.length < MAXIMUM_LENGTH) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.NAME_MINIMUM_LENGTH,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  const productsFound = await ProductService.findProductByName(product.name);
  const isTheNameInUse = productsFound.length > MINIMUM_LENGTH;

  if (isTheNameInUse) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.PRODUCT_ALREADY_EXISTS,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  next();
};

const validateProductExistence = async (request, response, next) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.WRONG_ID_FORMAT,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  const productsFound = await ProductService.findProductById(id);

  if (!productsFound) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.WRONG_ID_FORMAT,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  next();
};

const validateQuantity = (request, response, next) => {
  const product = request.body;
  const MINIMUM_LENGTH = 1;

  if (typeof product.quantity !== 'number') {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.QUANTITY_MUST_BE_A_NUMBER,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  if (product.quantity < MINIMUM_LENGTH) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.QUANTITY_BIGGER_THAN_ONE,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  next();
};


module.exports = {
  validateName,
  validateProductExistence,
  validateQuantity,
};
