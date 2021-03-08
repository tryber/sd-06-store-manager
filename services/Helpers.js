const compare ={
  minSize: 5,
  zeroQuantity: 0,
  hexObjectedId: 24,
};

const statusCode = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE: 422,
};

const message = {
  nameLength: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists',
  greaterThanZero: '"quantity" must be larger than or equal to 1',
  mustBeNumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
  invalidyQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
};

const greaterThan = (value, number) => (Math.floor(value) <= number);

const mustBeNumber = (value) => (typeof value !== 'number');

const responseWith = (code, message, response) => {
  const err = {
    err: {
      code: 'invalid_data',
      message
    },
  };
  return response.status(code).json(err);
};

module.exports = {
  compare,
  statusCode,
  message,
  greaterThan,
  mustBeNumber,
  responseWith,
};
