const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFount: 404,
  unprocessableEntity: 422
};

const codeTranslator = {
  422: 'invalid_data',
};

const errorMessages = {
  smallName: '"name" length must be at least 5 characters long',
  lowQuantity: '"quantity" must be larger than or equal to 1',
  quantityAsNumber: '"quantity" must be a number',
  productExists: 'Product already exists'
};

module.exports = {status, codeTranslator, errorMessages};