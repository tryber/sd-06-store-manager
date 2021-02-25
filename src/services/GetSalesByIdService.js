const Sales = require('../models/Sales');

const NOTFOUND = 404;
const SUCESS = 200;
const IDLENGTH = 24;

const getSalesByIdService = async (id) => {

  if (id.length !== IDLENGTH) return [ NOTFOUND, {err: 
    {code: 'not_found',
      message: 'Sale not found'
    }}];

  const sales = await Sales.getSaleById(id);
  console.log(sales);

  if (!sales) return [ NOTFOUND, {err: 
    {code: 'not_found',
      message: 'Sale not found'
    }}];

  const resp = [ SUCESS, sales ];
  return resp;
};

module.exports = getSalesByIdService;
