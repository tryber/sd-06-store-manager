const OK = 200;
const created = 201;
const notFound = 404;
const invalidParams = 422;
const zero = 0;
const cinco = 5;
const vinteQuatro = 24;
const msgError = (string) => {
  return {
    err: {
      code: 'invalid_data',
      message: string,
    }
  };
};
const msgNotFound = (string) => {
  return {
    err: {
      code: 'not_found',
      message: string,
    }
  };
};
const msgStock = (string) => {
  return {
    err: {
      code: 'stock_problem',
      message: string,
    }
  };
};
const nameRefusedMsg = (msgError('"name" length must be at least 5 characters long'));
const productExistingMsg = (msgError('Product already exists'));
const quantityGtZero = (msgError('"quantity" must be larger than or equal to 1'));
const quantityNaN = (msgError('"quantity" must be a number'));
const wrongId = (msgError('Wrong id format'));
const salesWrong = (msgError('Wrong product ID or invalid quantity'));
const saleNotFound = (msgNotFound('Sale not found'));
const saleIdWrong = (msgError('Wrong sale ID format'));
const stockProblem = (msgStock('Such amount is not permitted to sell'));

module.exports = {
  OK,
  created,
  notFound,
  invalidParams,
  zero,
  cinco,
  vinteQuatro,
  nameRefusedMsg,
  productExistingMsg,
  quantityGtZero,
  quantityNaN,
  wrongId,
  salesWrong,
  saleNotFound,
  saleIdWrong,
  stockProblem
};