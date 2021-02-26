const services = require('../services/productService');

const { STATUS_CODES: { OK, CREATED } } = require('../utils/dictionary');

const getAll = async (req, res) => {
  const products = await services.getAll();
  res.status(OK).json({ products });
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await services.getById(id);

    res.status(OK).json(productById);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await services.create(name, quantity);

    res.status(CREATED).json(newProduct);
  } catch(err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { body: { name, quantity }, params: { id } } = req;
    const updateProduct = await services.updateById(id, name, quantity);

    res.status(OK).json(updateProduct);
  } catch(err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const deletedProduct = await services.deleteById(id);

    res.status(OK).json(deletedProduct);
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
