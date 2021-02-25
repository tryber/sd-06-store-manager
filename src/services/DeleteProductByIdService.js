const Product = require('../models/Product');

const UNPROCESS = 422;
const SUCESS = 200;
const IDLENGTH = 24;

const deleteProductByIdService = async(id) => {
  
  if (id.length !== IDLENGTH) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong id format'
    }}];

  const product = await Product.deleteById(id);

  if (!product) return [ UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Wrong id format'
    }}];

  return [SUCESS, product];
};

module.exports = deleteProductByIdService;
