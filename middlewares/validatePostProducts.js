const { addNewProduct, searchForProductName } = require('../models/productsModel');

const {
  nameIsValid,
  quantityIsNumber,
  quantityIsLessThanZero,
  quantityIsEqualToZero,
} = require('../Services/validations');

// env !!!
const ERROR422 = 422;
const CREATED = 201;
const ZERO = 0;
const INTERNAL = 500;

const validatePostProducts = async function (req, res, next) {

  const { name, quantity } = req.body;

  const foundProducts = await searchForProductName(name);

  const productAlreadyExists = foundProducts.some(
    (ProductName) => ProductName === ProductName
  );

  //checa se foi enviado parametros vazio a rota /products
  if(req.body.constructor === Object && Object.keys(req.body).length === ZERO) {
    return res.status(INTERNAL).json(
      {
        err:
        {
          code: 'invalid_data',
          message: 'Wrong body data'
        }
      }
    );
  }

  if(!nameIsValid(name)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        }
      }
    );
  }

  if(!quantityIsNumber(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be a number'
        }
      }
    );
  }

  if(quantityIsLessThanZero(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(quantityIsEqualToZero(quantity)) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: '\"quantity\" must be larger than or equal to 1'
        }
      }
    );
  }

  if(productAlreadyExists) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: 'Product already exists'
        }
      }
    );
  }

  if(!productAlreadyExists) {
    await addNewProduct(name, quantity);
    res.status(CREATED).json(await searchForProductName(name));
  }
  next();
};

module.exports = {
  validatePostProducts
};
