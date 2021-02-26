const Sales = require('../models/Sales');
const Products = require('../models/Products');

const error = 422;
const errorNotFound = 404;
const ZERO = 0;
const UM = 1;
const TWEENTYFOUR = 24;

const messageError = (code, message) => {
  return {
    err: {
      code,
      message,
    }
  };
};

const validateQuantity = (request, response, next) => {
  const sales = request.body;

  const wrongQuantities = sales
    .filter((sale) => (sale.quantity <= ZERO) || (typeof sale.quantity !== 'number'));

  return wrongQuantities.length >= UM
    ?
    response
      .status(error)
      .json(messageError('invalid_data', 'Wrong product ID or invalid quantity'))
    :
    next();
};

const saleExists = async (request, response, next) => {
  const { id } = request.params;

  return ((id.length !== TWEENTYFOUR)
    || (id.length === TWEENTYFOUR && await Sales.findById(id) === null))
    ?
    response
      .status(errorNotFound).json(messageError('not_found', 'Sale not found'))
    :
    next();
};

const idFormat = async (request, response, next) => {
  const { id } = request.params;

  return id.length !== TWEENTYFOUR
    ?
    response
      .status(error).json(messageError('invalid_data', 'Wrong sale ID format'))
    :
    next();
};

const isQuantityInStock = async (request, response, next) => {
  const saleInOrder = request.body;

  Promise.all(saleInOrder.map(async (sale) => {
    const { productId, quantity } = sale;
    const achei = await Products.findById(productId);
    return achei.quantity > quantity;
  }))
    .then((values) => {
      return !values[0]
        ?
        response
          .status(errorNotFound)
          .json(messageError('stock_problem', 'Such amount is not permitted to sell'))
        :
        next();
    });
};

module.exports = {
  validateQuantity,
  saleExists,
  idFormat,
  isQuantityInStock,
};
