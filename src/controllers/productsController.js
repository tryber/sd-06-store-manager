const { Router } = require('express');
const ProductsService = require('../services/ProductsService');

const productsRouter = Router();
const SUCCESS = 200;
const SUCCESS201 = 201;

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductsService.findById(id);

  if (result.payload) return next(result);
  return res.status(SUCCESS).json(result);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await ProductsService.updateProduct(id, name, quantity);

  if (result.payload) return next(result);
  return res.status(SUCCESS).json(result);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await ProductsService.deleteProduct(id);

  if (result.payload) return next(result);
  return res.status(SUCCESS).json(result);
};

const getAll = async (_req, res) => {
  const result = await ProductsService.getAll();

  return res.status(SUCCESS).json(result);
};

const insertProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.insertProduct(name, quantity);

  if (result.payload) return next(result);
  return res.status(SUCCESS201).json(result);
};

module.exports = {
  getById,
  updateProduct,
  deleteProduct,
  getAll,
  insertProduct,
};
