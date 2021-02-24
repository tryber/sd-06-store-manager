const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const ERR = 422;
const minLength = 5;
const zero = 0;
const SUCCESS = 200;


const getAll = async () => await productsModel.getAll();

const getById = async (id) => await productsModel.getById(id);

const create = async (data) => await productsModel.create(data);

const update = async (id, data) => await productsModel.update(id, data);

const remove = async (id) => await productsModel.remove(id);

const usedAlready = async(req, res, next) => {
  const { name } = req.body;
  const exists = await productsModel.getByName(name);
  
  if(exists) return res.status(ERR).send({
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  });
  next();
};

const validate = async(req, res, next) => {
  const { name, quantity } = req.body;

  if (
    (!name || typeof name !== 'string') ||
    (typeof name === 'string' && name.length < minLength)
  ) return res.status(ERR).send({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  });

  if (
    (!quantity && quantity !== zero) ||
    (typeof quantity !== 'number')
  ) return res.status(ERR).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });

  if (!quantity || quantity <= zero) return res.status(ERR).send({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  });

  next();
};

const idValidation = (req, res, next) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) return res.status(ERR).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  next();
};

module.exports = {
  getAll,
  create,
  validate,
  getById,
  idValidation,
  update,
  remove,
  usedAlready,
};
