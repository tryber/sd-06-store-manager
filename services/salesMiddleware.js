const productsModel = require('../models/productsModel');

const {
  validationSalesQuantity,
  validationSalesProductId
} = require('./salesValidations');

const collectionSales = 'sales';

const objMessageError = (message) => ({ err: { code:'invalid_data', message }});

const validationSalesBody = async (req, res, next) => {
  const { body } = req;
  const zero = 0;

  for (let index = zero; index < body.length; index += 1) {
    const sale = body[index];
    
    const errorQuantity = validationSalesQuantity(sale);
    if (errorQuantity) {
      const { message, status } = errorQuantity;
      return res.status(status).json(objMessageError(message));
    }

    const errorProductId = await validationSalesProductId(sale);
    if (errorProductId) {
      const { message, status } = errorProductId;
      return res.status(status).json(objMessageError(message));
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

module.exports = {
  validationSalesBody,
  postSales
};
