const { create, 
  findByName, 
  getAllProducts, 
  findById } = require('../models/productsModels');
const { status, Messages } = require('../util/dataStatus');


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

  const result = await findById(id);

  if (result === null) {
    return res.status(status.notFormated).json(Messages.invalidId);
  }

  return res.status(status.OK).json(result);
};

const allProducts = async (_req, res) => {
  const result = await getAllProducts();

  return res.status(status.OK).json(result);;
};

module.exports = {
  idProduct,
  createProduct,
  allProducts,
};