const service = require('../services/salesServices');
const { SUCCESS } = require('../dictionary/statusCode');
const { wrongIdFormat } = require('../dictionary/errorMessages');

const createNewSale = async (req, res, next) => {
  const sale = req.body;
  const saleCreated = await service.createSale(sale);

  return res.status(SUCCESS).json(saleCreated);
};

module.exports = {
  createNewSale,
};