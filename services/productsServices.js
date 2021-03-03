const { create, 
  findByName, 
  getAllProducts, 
  findById,
  updateUnitProduct,
  deleteUnitProduct } = require('../models/productsModels');
  
const { status, Messages } = require('../util/dataStatus');
const { ObjectId } = require('mongodb');


const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const nameInMongoDb = await findByName(name);

  if (nameInMongoDb !== null) {
    return res.status(status.notFormated).json(Messages.productExist);
  }

  const result = await create(name, quantity);
  return res.status(status.create).json(result);
};

const idProduct = async (req, res) => {
  const { id } = req.params;
  
  const result = await findById(ObjectId(id));

  if (result === null) {
    return res.status(status.notFormated).json(Messages.invalidId);
  }

  return res.status(status.OK).json(result);
};

const allProducts = async (_req, res) => {
  const result = await getAllProducts();

  return res.status(status.OK).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await updateUnitProduct(id, name, quantity);

  return res.status(status.OK).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await deleteUnitProduct(id);

  return res.status(status.OK).json(result);
};

module.exports = {
  idProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  allProducts,
};