const Product = require('../models/Product');

const UNPROCESS = 422;
const SUCESS = 201;

const createProduct = async (name, quantity) => {

  const productResponse = await Product.getByName(name);
  if(productResponse.length > 0) return [UNPROCESS, {err: 
    {code: "invalid_data",
    message: "Product already exists"
  }}];;

  if (!(quantity / 1) === quantity) return 'quantity nao é um numero inteiro';

  if (name.length < 5) return [UNPROCESS, {err: 
    {code: "invalid_data",
    message: "\"name\" length must be at least 5 characters long"
  }}];

  if (quantity <= 0) return [UNPROCESS, {err: 
    {code: "invalid_data",
    message: "\"quantity\" must be larger than or equal to 1"
  }}];

  if (typeof quantity === "string") return [UNPROCESS, {err: 
    {code: "invalid_data",
    message: "\"quantity\" must be a number"
  }}];

  console.log(typeof quantity)

  const product = await Product.createProduct(name, quantity);

  return [SUCESS, {
    id: product,
    name,
    quantity,
  }];
}

module.exports = createProduct;
