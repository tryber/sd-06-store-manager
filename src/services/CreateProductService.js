const Product = require('../models/Product');

const UNPROCESS = 422;
const SUCESS = 201;

const ZERO = 0;
const FIVE = 5;

const createProduct = async (name, quantity) => {

  const productResponse = await Product.getByName(name);
  if(productResponse.length > ZERO) return [UNPROCESS, {err: 
    {code: 'invalid_data',
      message: 'Product already exists'
    }}];;

  // if (quantity !== parseInt(quantity, 10)) return [UNPROCESS, {err: 
  //   {code: 'invalid_data',
  //     message: '\"quantity\" must be a integer number'
  //   }}];

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

  const product = await Product.createProduct(name, quantity);

  return [SUCESS, {
    id: product,
    name,
    quantity,
  }];
};

module.exports = createProduct;
