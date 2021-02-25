const Sales = require('../models/Sales');

const UNPROCESS = 422;
const SUCESS = 200;
const IDLENGTH = 24;

const deleteSaleByIdService = async(id) => {
  
  if (id.length !== IDLENGTH) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong sale ID format'
    }}];

  const sale = await Sales.deleteSalesById(id);

  if (!sale) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong sale ID format'
    }}];

  return [SUCESS, { _id: id, itensSold: sale }];
};

module.exports = deleteSaleByIdService;