const productsService = require('../Service/productsService');
const salesService = require('../Service/salesService');
const { ObjectId } = require('mongodb');
const Unauthorized = 422;
const NotFound = 404;

const validateNameSize = (req, _res, next) => {
  const { name } = req.body;
  const Five = 5;
  if (name.length < Five) 
    return next({
      status: Unauthorized,  
      err: 
          {
            code: 'invalid_data',
            message: '"name" length must be at least 5 characters long',
          }
    });
  next();
};

const productAlreadyExits = async(req, _res, next) => {
  const { name } = req.body;
  const newSale = await productsService.productByNameService(name);
  if (newSale) 
    return next({
      status: Unauthorized,  
      err: 
            {
              code: 'invalid_data',
              message: 'Product already exists',
            }
    });
  next();
};

const quantityNotNegativeOrZero = (req, _res, next) => {
  const { quantity } = req.body;
  const Zero = 0;
  if (quantity <= Zero) 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  next();
};

const quantityNotAString = (req, _res, next) => {
  const { quantity } = req.body;
  if (typeof quantity === 'string') 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  next();
};

const validateId = (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) 
    return next({
      status: Unauthorized,  
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
  next();
};

const wrongId = async(req, _res, next) => {
  const { id } = req.params;
  const newProduct = await productsService.productByIdService(id);
  if (!newProduct) 
    return next({
      status: Unauthorized,  
      err: 
            {
              code: 'invalid_data',
              message: 'Wrong id format',
            }
    });
  next();
};

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

module.exports = {
  validateNameSize,
  productAlreadyExits,
  quantityNotNegativeOrZero,
  quantityNotAString,
  validateId,
  wrongId,
  quantityNotNegativeOrZeroSales,
  quantityNotAStringSales,
  validateIdSale,
  wrongIdSale
};