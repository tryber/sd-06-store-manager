const Sales = require('../models/Sales');
const Products = require('../models/Products');

const error = 422;
const numberZero = 0;
const numberOne = 1;
const lengthSize = 24;
const salesNotFoundErro = 404;

const messageError = (code, message) => {
  return {err: { code, message, }};
};

const quantitySalesValidation = (req, res, next) => {
  const sales = req.body;

  const invalidQuantity = sales.filter((sale) => 
    (sale.quantity <= numberZero) || (typeof sale.quantity !== 'number'));

  if (invalidQuantity.length >= numberOne) 
    return res.status(error)
      .json(messageError('invalid_data', 'Wrong product ID or invalid quantity'));

  next();
};

const salesValidation = async (req, res, next) => {
  const { id } = req.params;

  if ((id.length !== TWEENTYFOUR) || (id.length === TWEENTYFOUR && 
    await Sales.findById(id) === null)) 
    return res.status(salesNotFoundErro)
      .json(messageError('not_found', 'Sale not found'));
  
  next();
};

const idSalesValidation = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== lengthSize) 
    return res.status(error)
      .json(messageError('invalid_data', 'Wrong sale ID format'));

  next();
};

const stockFlow = async (req, res, next) => {
  const callSales = req.body;

  Promise.all(callSales.map(async (sale) => {
    const { productId, quantity } = sale;
    const stock = await Products.findById(productId);
    return stock.quantity > quantity;
  }))
    .then((values) => {
      if(!values[0])
        return res.status(salesNotFoundErro)
          .json(messageError('stock_problem', 'Such amount is not permitted to sell'));
      next();
    });
};

module.exports = {
  quantitySalesValidation,
  salesValidation,
  idSalesValidation,
  stockFlow,
};
