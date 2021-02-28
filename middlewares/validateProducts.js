
const { addNewProduct, searchForProductName } = require('../models/productsModel');

const validateProducts = async function (req, res, next) {

  const { name, quantity } = req.body;

  /* eslint-disable */
  const getProductByName = await searchForProductName(name);

  if(name.length < 5 ) {
    res.status(422).json({ err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long'} });
  }

  if(typeof quantity !== 'number') {
    res.status(422).json({ err: { code: 'invalid_data', message: '\"quantity\" must be a number'} });
  }
  
  if(typeof quantity !== 'number' || quantity <= 0) {
    res.status(422).json({ err: { code: 'invalid_data', message: '\"quantity\" must be larger than or equal to 1'} });
  }

  if(getProductByName.find((ProductName) => ProductName === ProductName )) {
    res.status(422).json(
      { err:
        {
          code: 'invalid_data',
          message: 'Product already exists'}
      });
  }

  if(!getProductByName.find((ProductName) => ProductName === ProductName )) {
    await addNewProduct(name, quantity);
    res.status(201).json(await searchForProductName(name));
  }
  /* eslint-enable */ 
  
  next();
};

module.exports = {
  validateProducts,
};
