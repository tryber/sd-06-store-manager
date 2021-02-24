const Product = require('../models/Product');

const UM = 1;
const UNPROCESS = 422;
const SUCESS = 200;

const getProductByIdService = async (id) => {
  const productResponse = await Product.getAllProduct();

  const product = productResponse[id-UM];

  if (product === undefined) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong id format'
    }}];

  const resp = [ SUCESS, product ];
  return resp;
};

module.exports = getProductByIdService;