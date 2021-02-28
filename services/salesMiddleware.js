const productsModel = require('../models/productsModel');

const {
  validationSalesQuantity,
  validationSalesProductId,
  validationSalesRouterIdAndSaveSale,
  validationSalesRouterIdAndSaveSaleDelete
} = require('./salesValidations');

const collectionSales = 'sales';

const objMessageError = (message, code) => ({ err: { code, message } });

const validationSalesBody = async (req, res, next) => {
  const { body } = req;
  const zero = 0;

  for (let index = zero; index < body.length; index += 1) {
    const sale = body[index];

    const errorCode = 'invalid_data';
    
    const errorQuantity = validationSalesQuantity(sale);
    if (errorQuantity) {
      const { message, status } = errorQuantity;
      return res.status(status).json(objMessageError(message, errorCode));
    }

    const errorProductId = await validationSalesProductId(sale);
    if (errorProductId) {
      const { message, status } = errorProductId;
      return res.status(status).json(objMessageError(message, errorCode));
    }
  }

  next();
};

const postSales = async (req, res, next) => {
  const { body } = req;
  
  const copyBody = { itensSold: [...body] };

  await productsModel.uploadDB(collectionSales, copyBody);

  res.locals.objAdicionado = copyBody;

  next();
};

const getAllSales = async (_req, res, next) => {
  const allSales = await productsModel.getAll(collectionSales);

  res.locals.allSales = {
    sales: allSales
  };

  next();
};

const findByIdSales = async (req, res, next) => {
  const { id } = req.params;
  
  const errorCode = 'not_found';

  const errorIdNotExist = await validationSalesRouterIdAndSaveSale(id, res);

  if (errorIdNotExist) {
    const { message, status } = errorIdNotExist;
    return res.status(status).json(objMessageError(message, errorCode));
  }

  next();  
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const errorCode = 'invalid_data';

  const erroDelete = await validationSalesRouterIdAndSaveSaleDelete(id, res);
  if (erroDelete) {
    const { message, status } = erroDelete;
    return res.status(status).json(objMessageError(message, errorCode));
  }

  next();
};

module.exports = {
  validationSalesBody,
  postSales,
  getAllSales,
  findByIdSales,
  deleteSale
};
