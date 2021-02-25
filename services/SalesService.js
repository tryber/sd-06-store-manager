const SalesModel = require('../models/SalesModel');
const code = 'invalid_data';
const ZERO = 0;

const validateFields = async (products) => {
  const status = false;
  const ONE = 1;

  const isOK = products
    .some(product => (typeof product.quantity !== 'number' || product.quantity < ONE) );

  if (isOK) return {
    status, code, httpcode: 422, msg: 'Wrong product ID or invalid quantity' 
  };

  return { status: true };
};

const insertSale = async (products) => {
  const validate = await validateFields(products);
  if (!validate.status) {
    let err = new Error();
    err.statuscode = validate.httpcode;
    err.message = { 
      code: validate.code, 
      message: validate.msg
    };
    throw err;
  };
  
  const insertedId = await SalesModel.insertSale(products);
  return {
    _id: insertedId,
    itensSold: products
  };
};

const getAll = async () => await SalesModel.getAll();

const findById = async (id) => {
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
    return sale;
  } catch {
    let err = new Error();
    err.statuscode = onErrorMsg.statuscode;
    err.message = onErrorMsg.err;
    throw err;
  };
};

const updateSale = async (id, products) => {
  console.log(products);
  const validate = await validateFields(products);
  if (!validate.status) {
    let err = new Error();
    err.statuscode = validate.httpcode;
    err.message = { 
      code: validate.code, 
      message: validate.msg
    };
    throw err;
  };
  try {
    await SalesModel.updateSale(id, products);
  } catch {
    let err = new Error();
    err.statuscode = 422;
    err.message = { 
      code, 
      message: 'Wrong product ID or invalid quantity'
    };
    throw err;
  }

  return true;
};

module.exports = {
  insertSale,
  getAll,
  findById,
  updateSale,
};
