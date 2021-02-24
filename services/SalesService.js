const SalesModel = require('../models/SalesModel');
const code = 'invalid_data';


const validateFields = async (products) => {
  const status = false;
  const ONE = 1;

  const isOK = products
    .some(product => (typeof product.quantity !== 'number' || product.quantity < ONE) );

  if (isOK) return { 
    status, code, httpcode: 422, msg: 'Wrong product ID or invalid quantity' 
  };

  // if (product.name.length < MIN_CHARS) return { 
  //   status, code, httpcode: 422, msg: 'Wrong product ID or invalid quantity' 
  // };
  
  // if (typeof product.quantity !== 'number') return { 
  //   status, code, httpcode: 422, msg: '"quantity" must be a number' 
  // };

  // if (parseInt(product.quantity) < ONE) return { 
  //   status, code, httpcode: 422, msg: '"quantity" must be larger than or equal to 1' 
  // };

  // if (product.name) {
  //   const nameExists = await ProductsModel.findByName(product.name);
  //   if (nameExists) return { 
  //     status, code, httpcode: 422, msg: 'Product already exists' 
  //   };
  // }

  return { status: true };
};

const insertProducts = async (products) => {
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

  const insertedId = await SalesModel.insertProducts(products);
  return {
    _id: insertedId,
    itensSold: products
  };
};

module.exports = {
  insertProducts,
};
