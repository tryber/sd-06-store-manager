const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

const ERROR_MESSAGE = {
  invalidNameLength: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    },
  },
  productAlreadyExists: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    },
  },
  zeroQuantityNotAllowed: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    },
  },
  invalidQuantityField: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  },
  invalidId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  },
  invalidQuantityOrId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  },
  invalidSaleId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  },
  saleNotFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  },
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGE
};
