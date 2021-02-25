const { productsHandlingDB } = require('../models');
const { errorMessages, status } = require('../utilsData/dataResponses');

const create = async (req, res,) => {
  const { name, quantity } = req.body;
  const handle = await  productsHandlingDB.create(name,quantity);
  return res.status(status.created).json(handle);
};

const getAll = async (_req, res,) => {
  const resultGet = await productsHandlingDB.getAll();
  return res.status(status.OK).json(resultGet);
};

const getById = async (req, res,) => {
  const { id }= req.params;
  const resultGet = await productsHandlingDB.findById(id);
  if(resultGet) return res.status(status.OK).json(resultGet);
  return res.status(status.Unprocessable_Entity).json(errorMessages.not_id);
};

const update = async (req,res)=>{
  const { id } = req.params;
  const { name, quantity } = req.body;
  const resultUpdate = await productsHandlingDB.update(id,name,quantity);
  return res.status(status.OK).json(resultUpdate);
};

const deleteProduct = async (req,res) => {
  const { id } = req.params;
  const resultDelete = await productsHandlingDB.deleteProduct(id);
  if(resultDelete) return res.status(status.OK).json(resultDelete);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct
};
