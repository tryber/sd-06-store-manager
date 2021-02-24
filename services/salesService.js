const salesModel = require('../models/salesModel');
const Product = require('../services/productsServices');
const { ObjectId } = require('mongodb');

const ERR = 422;
const zero = 0;
const NOTFOUND = 404;

const getAll = async () => await salesModel.getAll();

const create = async (data) => await salesModel.create(data);

const getById = async (id) => await salesModel.getById(id);

const update = async (id, data) => await salesModel.update(id, data);

const remove = async (id) => await salesModel.remove(id);

const validate = (req, res, next) => {
  req.body.forEach((item) => {
    const { quantity } = item;

    if (
      (!quantity && quantity !== zero) ||
    (typeof quantity !== 'number')
    ) return res.status(ERR).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });

    if (!quantity || quantity <= zero) return res.status(ERR).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  });
  

  next();
};

const idValidation = async (req, res, next) => {
  req.body.forEach( async (item) => {
    const { productId } = item;
    if(!ObjectId.isValid(productId)) return res.status(ERR).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
    const product = await Product.getById(productId);
    if(!product) return res.status(ERR).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  });
  
  next();
};

const saleIdValidation = async (req, res, next) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) return res.status(NOTFOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
  next();
};

const deleteIdValidation = async (req, res, next) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) return res.status(ERR).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  });
  next();
};


module.exports = {
  getAll,
  create,
  validate,
  idValidation,
  getById,
  saleIdValidation,
  update,
  remove,
  deleteIdValidation,
};
