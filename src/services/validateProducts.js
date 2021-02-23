const MINIMUM_LENGTH = 5;
const MINIMUM_QUANTITY = 0;
const UNPROCESSABLE_ENTITY = 422;

const connection = require('../database');
const { ObjectId } = require('mongodb');

const createProduct = async (name) => {
  const nameProduct = await connection().then((db) =>
    db.collection('products').findOne({ name })
  );

  if (nameProduct !== null) {

    return nameProduct.name;
  }
};

const validateProduts = async (req, res, next) => {
  const {name, quantity} = req.body;

  const nameExist = await createProduct(name);
  // console.log(nameTrueOrFalse);

  if (name && name.length < MINIMUM_LENGTH) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '\"name\" length must be at least 5 characters long'
      }
    });
  }

  if (name && name === nameExist) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }

  if (quantity && typeof quantity === 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be a number'
      }
    });
  }

  if (quantity && quantity <= MINIMUM_QUANTITY || quantity === MINIMUM_QUANTITY) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '\"quantity\" must be larger than or equal to 1'
      }
    });
  }

  next();
};

module.exports = validateProduts;
