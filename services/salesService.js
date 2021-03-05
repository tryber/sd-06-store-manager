const { createSale,
  getAllSales,
  getSaleUnit,
  updateSaleUnit } = require('../models/salesModels');
const { status, Messages } = require('../util/dataStatus');

const create = async (req, res)=> {
  const result = req.body; 

  const resultSale = await createSale(result);

  return res.status(status.OK).json({
    _id: resultSale,
    itensSold:result
  });

};


const getSales = async (_req, res) => {
  const result = await getAllSales();
  return res.status(status.OK).json(result);
};

const getSaleId = async (req, res) => {
  const { id } = req.params;
  const result = await getSaleUnit(id);

  if(!result) return; 
  
  return res.status(status.OK).json(result);
};

const updateSate = async (req, res) => {
  const { id } = req.params;
  const bodySale = req.body;

  const result = await updateSaleUnit(id, bodySale);

  return res.status(status.OK).json(result);
};

module.exports = {
  create,
  getSales,
  getSaleId,
  updateSate
};