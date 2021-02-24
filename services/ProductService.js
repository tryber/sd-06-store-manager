const ProductsModel = require('../models/ProductsModel');
const code = 'invalid_data';
const ZERO = 0;

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
  if (!validate.status) {
    let err = new Error();
    err.statuscode = validate.httpcode;
    err.message = { 
      code: validate.code, 
      message: validate.msg
    };
    throw err;
  };
    
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
    if (!result) {
      let err = new Error();
      err.statuscode = onErrorMsg.statuscode;
      err.message = onErrorMsg.err;
      throw err;
    };
    return result;
  } catch {
    let err = new Error();
    err.statuscode = onErrorMsg.statuscode;
    err.message = onErrorMsg.err;
    throw err;
  };
};

const updateProduct = async (id, name, quantity) => {
  const validate = await validateFields({name, quantity});
  if (!validate.status) {
    let err = new Error();
    err.statuscode = validate.httpcode;
    err.message = { 
      code: validate.code, 
      message: validate.msg
    };
    throw err;
  };

  const modifiedCount = await ProductsModel.updateProduct(id, name, quantity);
  if (modifiedCount === ZERO) return { 
    statuscode: 422, 
    err: { 
      code, 
      message: 'No changes'
    }
  }; 
  return true;
};

const deleteProduct = async (id) => {
  const product = await findById(id);
  await ProductsModel.deleteProduct(id);
  return product;
};

module.exports = {
  insertProduct,
  validateFields,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};
