const ProductsModel = require('../models/ProductsModel');
const code = 'invalid_data';

const validateFields = async (product) => {
  const status = false;
  const MIN_CHARS = 5;
  const ONE = 1;

  if (product.name.length < MIN_CHARS) return { 
    status, code, httpcode: 422, msg: '"name" length must be at least 5 characters long' 
  };
  
  if (typeof product.quantity !== 'number') return { 
    status, code, httpcode: 422, msg: '"quantity" must be a number' 
  };

  if (parseInt(product.quantity) < ONE) return { 
    status, code, httpcode: 422, msg: '"quantity" must be larger than or equal to 1' 
  };

  if (product.name) {
    const nameExists = await ProductsModel.findByName(product.name);
    if (nameExists) return { 
      status, code, httpcode: 422, msg: 'Product already exists' 
    };
  }

  return { status: true };
};

const insertProduct = async (product) => {

  const validate = await validateFields(product);
  if (!validate.status) return {
    statuscode: validate.httpcode, 
    err: { 
      code: validate.code, 
      message: validate.msg
    } };
    
  const newId = await ProductsModel.insertProduct(product);
  const { name, quantity } = product;
  return {
    _id: newId,
    name,
    quantity,
  };
};

const getAll = async () => await ProductsModel.getAll();

const findById = async (id) => {
  const onErrorMsg = {
    statuscode: 422, 
    err: { 
      code, 
      message: 'Wrong id format'
    } };

  try {
    const result = await ProductsModel.findById(id);
    if (!result) return onErrorMsg;
    return result;
  } catch {
    return onErrorMsg; 
  };
};


module.exports = {
  insertProduct,
  validateFields,
  getAll,
  findById,
};