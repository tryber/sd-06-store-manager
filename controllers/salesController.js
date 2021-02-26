const salesService = require('../services/salesService');

const SUCCESS = 200;

const getAll = async (request, response) => {
  try {
    const sales = await salesService.getAll();
    return response.status(SUCCESS).json(sales);
  } catch (err) {
    next(err);
  }
};

const findById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const sale = await salesService.findById(id);
    return response.status(SUCCESS).json(sale);
  } catch (err) {
    next(err);
  }
};

const create = async(request, response, next) => {
  try {
    const sale = request.body;
    const registeredSale = await salesService.create(sale);
    return response.status(SUCCESS).json(registeredSale);
  } catch (err) {
    next(err);
  }
};

const update = async (request, response, next) => {
  try {
    const { id } = request.params;
    const sale = request.body;
    const updatedSale = await salesService.update(id, sale);
    return response.status(SUCCESS).json(updatedSale);
  } catch (err) {
    next(err);
  }
};

const remove = async(request, response, next) => {
  try {
    const { id } = request.params;
    const sale = await salesService.remove(id);
    return response.status(SUCCESS).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};