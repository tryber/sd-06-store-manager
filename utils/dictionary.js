const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
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
  serverError: {
    err: {
      code: 'server_error',
      message: 'something went wrong'
    },
  },
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGE
};
