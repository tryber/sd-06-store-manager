const { createSale, createSales } = require('../models/salesModels');
const { status, Messages } = require('../util/dataStatus');
const {findById} = require('../models/productsModels');

const create = async (req, res)=> {
  const result = req.body; 

  const resultSale = await createSale(result);
  console.log(resultSale);

  return res.status(status.OK).json({
    _id: resultSale,
    itensSold:result
  });

};

module.exports = {
  create,
};