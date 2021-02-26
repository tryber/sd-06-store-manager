const salesConnection = require('../Model/salesConnection');
const productsConnection = require('../Model/productsConnection');
const { ObjectId } = require('mongodb');

const codeErr = 422;
const notFound = 404;
const created = 201;
const OK = 200;
const nameLength = 5;
const ZERO = 0;
const qntMessage = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity'
};

const getAll = async (req, res) => {
  const allSales = await salesConnection.getAll();
  /* console.log(allSales); */

  if (!allSales) {
    return res.status(notFound).json({
      err: 'not_found',
      message: 'Sale not found'
    });
  }

  res.status(OK).json({ sales: allSales});
};

const findById = async (req, res) => {
  const {id} = req.params;

  const validId = ObjectId.isValid(id);

  if(validId !== true) {
    return res.status(notFound).json({ err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  }

  const findId = await salesConnection.findById(id);

  if (!findId) {
    return res.status(notFound).json({ err: {
      code: 'not_found',
      message: 'Sale not found'
    }});
  } else {
    return res.status(OK).json(findId);
  }
  res.status(OK).json(findId);
};

const create = async (req, res) => {
  const sales = req.body;

  const eachProductId = sales.map((item) => item.productId);
  /* console.log(eachProductId); */
  const eachQuantity = sales.map((item) => item.quantity);
  /* console.log(eachQuantity); */

  for(quantity of eachQuantity) {
    if(quantity <= ZERO) {
      return res.status(codeErr).json({ err: qntMessage});
    }
    if(typeof quantity !== 'number') {
      return res.status(codeErr).json({ err: qntMessage});
    }
  };

  for(productId of eachProductId) {
    if(ObjectId.isValid(productId) !== true) {
      return res.status(codeErr).json({ err: qntMessage});
    }

    const verifyId = await productsConnection.getById(productId);
    if (!verifyId) {
      return res.status(codeErr).json({ err: qntMessage});
    }
  };

  const creation = await salesConnection.create(sales);
  /* console.log(creation); */
  
  res.status(OK).json(creation.ops[0]);
  
};

const deletar = async (req, res) => {
  const {id} = req.params;

  const isValid = ObjectId.isValid(id);
  if (isValid !== true) {
    return res.status(codeErr).json({ err:{
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }});
  }

  const getSaleId = await salesConnection.findById(id);

  if(!getSaleId) {
    return res.status(codeErr).json({ err:{
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }});
  }

  const remove = await salesConnection.remove(id);
  if(!remove) {
    return res.status(codeErr).json({ err:{
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }});
  }

  res.status(OK).json(getSaleId);
};

module.exports = {
  create,
  getAll,
  findById,
  deletar,
};
