const OK = 200;
const created = 201;
const notFound = 404;
const invalidParams = 422;
const zero = 0;
const cinco = 5;
const vinteQuatro = 24;
const msgError = (code, string) => {
  return {
    err: {
      code: code,
      message: string,
    }
  };
};
const nameRefusedMsg = (msgError('invalid_data',
  '"name" length must be at least 5 characters long'));
const productExistingMsg = (msgError('invalid_data', 'Product already exists'));
const quantityGtZero = (msgError('invalid_data',
  '"quantity" must be larger than or equal to 1'));
const quantityNaN = (msgError('invalid_data', '"quantity" must be a number'));
const wrongId = (msgError('invalid_data', 'Wrong id format'));
const salesWrong = (msgError('invalid_data', 'Wrong product ID or invalid quantity'));
const saleNotFound = (msgError('not_found', 'Sale not found'));
const saleIdWrong = (msgError('invalid_data', 'Wrong sale ID format'));
const stockProblem = (msgError('stock_problem', 'Such amount is not permitted to sell'));

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