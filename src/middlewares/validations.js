const { ObjectId } = require('mongodb');
const ProductService = require('../service/ProductService');
const SaleService = require('../service/SaleService');
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

  if (isTheNameInUse && request.method !== 'PUT') {
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

const validateItensSoldQuantity = (request, response, next) => {
  const sale = request.body;
  const MINIMUM_QUANTITY = 1;

  const invalidQuantity = sale
    .find(item => item.quantity < MINIMUM_QUANTITY || typeof item.quantity === 'string');

  if (invalidQuantity) {
    return response.status(statusCodes.UNPROCESSABLE_ENTITY).json(
      {
        err: {
          message: errorMessages.WRONG_PRODUCT_ID_OR_INVALID_QUANTITY,
          code: codeMessages.INVALID_DATA,
        }
      }
    );
  }

  next();
};

const validateSaleExistence = async (request, response, next) => {
  const { id } = request.params;
  const error = response.status(statusCodes.NOT_FOUND).json(
    {
      err: {
        message: errorMessages.SALE_NOT_FOUND,
        code: codeMessages.NOT_FOUND,
      }
    }
  );

  const idIsInvalid = !ObjectId.isValid(id);
  if (idIsInvalid) return error;

  const saleFound = await SaleService.findSaleById(id);
  if (!saleFound) return error;

  next();
};

module.exports = {
  validateName,
  validateItensSoldQuantity,
  validateProductExistence,
  validateQuantity,
  validateSaleExistence,
};
