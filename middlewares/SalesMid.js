const { getAllSales }  = require('../models/SalesModel');

const LIMITID = 24;
const ZERO = 0;
const UNPROCESSABLE = 422;
const NOT_FOUND = 404;

const validateSale = (req, res, next) => {
  const sales = req.body;

  sales.map((sale) => {
    if (
      sale.quantity === ZERO || sale.quantity < ZERO || typeof(sale.quantity) === 'string'
    ){
      return res.status(UNPROCESSABLE).json({ err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }});
    }
  });
  next();
};

const validateExistingSale = async(req, res, next) => {
  const allSales = await getAllSales();
  const { id } = req.params;
  const exist = allSales.find((sale) => sale._id.toString() === id.toString());
  if(!exist) return res.status(NOT_FOUND).json({ err: {
    code: 'not_found',
    message: 'Sale not found'
  }});
  next();
};

const validateDeletedSale = async(req, res, next) => {
  // const allSales = await getAllSales();
  const { id } = req.params;
  // const exist = allSales.find((sale) => sale._id.toString() === id.toString());
  if(id.length < LIMITID) return res.status(UNPROCESSABLE)
    .json({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }});
  next();
};
module.exports = {
  validateSale,
  validateExistingSale,
  validateDeletedSale
};