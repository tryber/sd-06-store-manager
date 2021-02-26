const services = require('../services/salesService');

const { STATUS_CODES: { OK } } = require('../utils/dictionary');

const create = async (req, res, next) => {
  try {
    const sales = req.body;
    const newSales = await services.create(sales);

    res.status(OK).json(newSales);
  } catch(err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesById = await services.getById(id);

    res.status(OK).json(salesById);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res) => {
  const sales = await services.getAll();
  res.status(OK).json({ sales });
};

const updateById = async (req, res, next) => {
  try {
    const {params: { id }, body: sale } = req;
    const updateSales = await services.updateById(id, sale);

    res.status(OK).json(updateSales);
  } catch(err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const deletedSale = await services.deleteById(id);

    res.status(OK).json(deletedSale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
