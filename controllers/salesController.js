const service = require('../services/salesServices');
const { SUCCESS, NOT_FOUND } = require('../dictionary/statusCode');
const { saleNotFound, WrongIdSaleFormat } = require('../dictionary/errorMessages');

const createNewSale = async (req, res, next) => {
  const sale = req.body;
  const saleCreated = await service.createSale(sale);

  return res.status(SUCCESS).json(saleCreated);
};

const getAll = async (req, res, next) => {
  const allSales = await service.allSales();

  return res.status(SUCCESS).json({ sales: allSales });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await service.saleById(id);

  if (!sale) {
    return next({
      statusCode: NOT_FOUND,
      ...saleNotFound
    });
  }

  return res.status(SUCCESS).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const saleUpdated = await service.updateSaleInfo(id, sale);

  return res.status(SUCCESS).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const deletedSale = await service.deleteSaleInfo(id);

  if (!deletedSale) {
    return next({
      statusCode: UNPROCESSABLE_ENTITY,
      ...WrongIdSaleFormat
    });
  }

  return res.status(SUCCESS).json(deletedSale);
};

module.exports = {
  createNewSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};