
const { addNewProduct, searchForProductName } = require('../models/productsModel');

const ERROR422 = 422;
const CREATED = 201;
const FIVE = 5;
const ZERO = 0;

const validateProducts = async function (req, res, next) {

  const { name, quantity } = req.body;

  const getProductByName = await searchForProductName(name);

  if(name.length < FIVE || name.length === '') {
    return res.status(ERROR422).json({
      err:
        {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }});
  }

  if(typeof quantity !== 'number') {
    return res.status(ERROR422).json({
      err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }});
  }
  
  if(typeof quantity !== 'number' || quantity <= ZERO) {
    return res.status(ERROR422).json({
      err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }});
  }

  if(getProductByName.find((ProductName) => ProductName === ProductName )) {
    return res.status(ERROR422).json({
      err:
        {
          code: 'invalid_data',
          message: 'Product already exists'
        }});
  }

  if(!getProductByName.find((ProductName) => ProductName === ProductName )) {
    await addNewProduct(name, quantity);
    res.status(CREATED).json(await searchForProductName(name));
  }
  
  next();
};

module.exports = {
  validateProducts,
};
