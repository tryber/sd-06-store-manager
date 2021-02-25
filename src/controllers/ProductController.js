const { Router } = require('express');
const ProductsRouter = Router();
const rescue = require('express-rescue');

const bodyParser = require('body-parser');
ProductsRouter.use(bodyParser.json());

const createProductService = require('../services/CreateProductService');
const getProductService = require('../services/GetProductService');
const getProductByIdService = require('../services/GetProductByIdService');
const updateProductByIdService = require('../services/updateProductByIdService');
const deleteProductByIdService = require('../services/deleteProductByIdService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const resp = await createProductService(name, quantity);

  return res.status(resp[0]).json(resp[1]);
};

const getAllProduct = async (_req, res) => {
  const resp = await getProductService();

  return res.status(resp[0]).json(resp[1]);
};

const getProductById = async (req, res) => {
  const id = req.params.id;

  const resp = await getProductByIdService(id);

  return res.status(resp[0]).json(resp[1]);
};

const updateProductById = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const quantity = req.body.quantity;

  const resp = await updateProductByIdService(id, name, quantity);

  return res.status(resp[0]).json(resp[1]);
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;
  const resp = await deleteProductByIdService(id);

  return res.status(resp[0]).json(resp[1]);
};

ProductsRouter.post('/', rescue(createProduct));
ProductsRouter.get('/', rescue(getAllProduct));
ProductsRouter.get('/:id', rescue(getProductById));
ProductsRouter.put('/:id', rescue(updateProductById));
ProductsRouter.delete('/:id', rescue(deleteProductById));

module.exports = ProductsRouter;
