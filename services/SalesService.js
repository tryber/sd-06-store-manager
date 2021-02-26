const SalesModel = require('../models/SalesModel');
const code = 'invalid_data';
const SUCCESS = 200;

const validateFields = async (req, res, next) => {
  const products = req.body;
  const status = false;
  const ONE = 1;

  const isOK = products
    .some(product => (typeof product.quantity !== 'number' || product.quantity < ONE) );

  if (isOK) {
    let err = new Error();
    err.statuscode = 422;
    err.message = { 
      code, 
      message: 'Wrong product ID or invalid quantity' 
    };
    throw err;
  } 
  next();
};

const insertSale = async (req, res) => {
  const products = req.body;
  
  const insertedId = await SalesModel.insertSale(products);
  const sale =  {
    _id: insertedId,
    itensSold: products
  };
  return res.status(SUCCESS).json(sale);
};

const getAll = async (req, res) => {
  const sales = await SalesModel.getAll();
  
  return res.status(SUCCESS).json({ sales });
};

const findById = async (req, res) => {
  const { id } = req.params;

  const onErrorMsg = {
    statuscode: 404, 
    err: { 
      code: 'not_found', 
      message: 'Sale not found'
    } };

  try {
    const sale = await SalesModel.findById(id);
    if (!sale) {
      let err = new Error();
      err.statuscode = onErrorMsg.statuscode;
      err.message = onErrorMsg.err;
      throw err;
    };
    return res.status(SUCCESS).json({ sale });
  } catch {
    let err = new Error();
    err.statuscode = onErrorMsg.statuscode;
    err.message = onErrorMsg.err;
    throw err;
  };
  
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const products = req.body;
  let sale;
  
  try {
    await SalesModel.updateSale(id, products);
    sale = await SalesModel.findById(id);
  } catch {
    let err = new Error();
    err.statuscode = 422;
    err.message = { 
      code, 
      message: 'Wrong product ID or invalid quantity'
    };
    throw err;
  }
  return res.status(SUCCESS).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  let deletedSale;

  try {
    deletedSale = await SalesModel.findById(id);
    await SalesModel.deleteSale(id);
  } catch {
    let err = new Error();
    err.statuscode = 422;
    err.message = { 
      code, 
      message: 'Wrong sale ID format'
    };
    throw err;
  }
  return res.status(SUCCESS).json(deletedSale);
};

module.exports = {
  validateFields,
  insertSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};
