const Sales = require('../models/Sales');

const UNPROCESS = 422;
const SUCESS = 200;
const ZERO = 0;

const createSaleService = async (arraySale) => {

  const negative = arraySale.find(element => element.quantity <= ZERO);
  if (negative) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }}];

  const negativeSting = arraySale.find(element => typeof element.quantity === 'string' );
  if (negativeSting) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }}];

  saleId = await Sales.createSale(arraySale);

  return [SUCESS, {
    _id: saleId,
    itensSold: arraySale
  }];
};

module.exports = createSaleService;
