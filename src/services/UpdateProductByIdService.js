const Product = require('../models/Product');

const UNPROCESS = 422;
const SUCESS = 200;
const ZERO = 0;
const FIVE = 5;

const updateProductByIdService = async (id, name, quantity) => {

  if (name.length < FIVE) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    }}];

  if (quantity <= ZERO) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1'
    }}];
  
  if (typeof quantity === 'string') return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: '\"quantity\" must be a number'
    }}];

  const product = await Product.updateById(id, name, quantity);
  if (product.modifiedCount === 1) return [SUCESS, {_id: id, name, quantity}];
  return product;
};

module.exports = updateProductByIdService;
