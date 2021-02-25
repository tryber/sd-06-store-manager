const Sales = require('../models/Sales');

const SUCESS = 200;

const getAllSalesService = async () => {
 
  const product = await Sales.getAllSales();

  const resp = [ SUCESS, product ];
  return resp;
};

module.exports = getAllSalesService;
