const Product = require('../models/Product');

const UNPROCESS = 422;
const SUCESS = 200;
const IDLENGTH = 24;

const getProductByIdService = async (id) => {
  if (id.length !== IDLENGTH) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong id format'
    }}];

  const product = await Product.getById(id);

  if (!product) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong id format'
    }}];

  const resp = [ SUCESS, product ];
  return resp;
};

module.exports = getProductByIdService;