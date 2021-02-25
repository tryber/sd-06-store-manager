const { productsHandlingDB } = require('../models');
const { errorMessages, status } = require('../utilsData/dataResponses');
const err = 422;
const minLength = 5;
const  valueZero = 0;

const validateBody = async (req, res, next) =>{
  const {name, quantity} = req.body;

  if(name.length < minLength) return res.status(status.Unprocessable_Entity)
    .json(errorMessages.invalid_name);

  const findForName = await  productsHandlingDB.findByName(name);
  if(findForName !== null) return res.status(status.Unprocessable_Entity)
    .json(errorMessages.repeat_name);

  if(quantity < valueZero || quantity === valueZero) return res.status(
    status.Unprocessable_Entity).json(errorMessages.larger_zero);

  if(typeof quantity === 'string') return res.status(
    status.Unprocessable_Entity).json(errorMessages.type_string);

  next();
};

const create = async (req, res,) => {
  const {name, quantity} = req.body;
  const handle = await  productsHandlingDB.create(name,quantity);
  return res.status(status.created).json(handle);
};

const getAll = async (_req, res,) => {
  const resultGet = await productsHandlingDB.getAll();
  return res.status(status.OK).json(resultGet);
};

const getById = async (req, res,) => {
  const { id }= req.params;
  const correctLength = 24;

  if(id.length === correctLength) {
    const resultGet = await productsHandlingDB.findById(id);
    if(resultGet) return res.status(status.OK).json(resultGet);
    return res.status(status.Unprocessable_Entity).json(errorMessages.not_id);
  }
  return res.status(
    status.Unprocessable_Entity).json(errorMessages.not_id);
};

module.exports = {create,validateBody, getAll, getById};
