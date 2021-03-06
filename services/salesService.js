const { createSale,
  getAllSales,
  getSaleUnit,
  updateSaleUnit,
  deleteSaleUnit } = require('../models/salesModels');
const { status, Messages } = require('../util/dataStatus');

const create = async (req, res)=> {
  console.log('estou aqui');
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

  if(!result) return res.status(status.not_found).json(Messages.invalidId); 
  
  return res.status(status.OK).json(result);
};

const updateSate = async (req, res) => {
  console.log('oi');
  const { id } = req.params;
  const bodySale = req.body;

  const result = await updateSaleUnit(id, bodySale);

  return res.status(status.OK).json(result);
};

const deleteSale = async (req, res) => {

  const { id } = req.params;

  const resultSaleUnit = await getSaleUnit(id);

  if(!resultSaleUnit) {
    return res.status(status.notFormated).json(Messages.invalidData);
  }

  const result = await deleteSaleUnit(id);

  return res.status(status.OK).json(result);
};

module.exports = {
  create,
  getSales,
  getSaleId,
  updateSate,
  deleteSale,
};