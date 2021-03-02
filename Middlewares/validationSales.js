
const salesService = require('../Service/salesService');
const { ObjectId } = require('mongodb');
const Unauthorized = 422;
const NotFound = 404;

const quantityNotNegativeOrZeroSales = (req, _res, next) => {
  const [{ quantity }] = req.body;
  const Zero = 0;
  if (quantity <= Zero) 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  next();
};
  
const quantityNotAStringSales = (req, _res, next) => {
  const [{ quantity }] = req.body;
  if (typeof quantity === 'string') 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  next();
};
  
const validateIdSale = (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) 
    return next({
      status: NotFound,  
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  next();
};
  
const wrongIdSale = async(req, _res, next) => {
  const { id } = req.params;
  const newSale = await salesService.saleByIdService(id);
  if (!newSale) 
    return next({
      status: NotFound,  
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  next();
};
  
const validateIdSaleDelete = (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  next();
};
  
const wrongIdSaleDelete = async(req, _res, next) => {
  const { id } = req.params;
  const newSale = await salesService.saleByIdService(id);
  if (!newSale) 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  next();
};

module.exports = {
  quantityNotNegativeOrZeroSales,
  quantityNotAStringSales,
  validateIdSale,
  wrongIdSale,
  validateIdSaleDelete,
  wrongIdSaleDelete
};