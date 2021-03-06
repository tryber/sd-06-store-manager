const Messages = {
  invalidName:
  {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  },

  productExist: { err: { code: 'invalid_data', message: 'Product already exists' } },

  largerZero:
    { err: { 
      code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } },

  invalidQtt: { err: { code: 'invalid_data', message: '"quantity" must be a number' } },

  invalidId: { err: { code: 'invalid_data', message: 'Wrong id format' } },

  InvalidQuantity:
    { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },

  salesNotFound: { err: { code: 'not_found', message: 'Sale not found' } },

  invalidData: { err: { code: 'invalid_data', message: 'Wrong sale ID format' } },
  stuckInvalid:
  {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell'
    }
  },
};

const status = {
  OK: 200,
  not_found: 404,
  notFormated: 422,
  create: 201,
};

module.exports = {
  Messages,
  status
};