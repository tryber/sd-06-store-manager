const Sales = require('../models/Sales');

const UNPROCESS = 422;
const SUCESS = 200;
const ZERO = 0;

const updateSalesByIdService = async (id, sales) => {

  const validationZero = sales.find(element => element.quantity <= ZERO );
  if (validationZero) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }}];
  
  const validationString = sales.find(element => typeof element.quantity === 'string' );
  if (validationString) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }}];

  const product = await Sales.updateSalesById(id, sales);
  if (product.modifiedCount === 1) return [SUCESS, { _id: id, itensSold: sales }];
  return product;
};

module.exports = updateSalesByIdService;