const {
  findProductByName,
  findProductById
} = require('../models/querys');

const magicNumberzero = 0;
const magicNumbercinco = 5;
const status422 = 422;
// const status200 = 200;


const validateNameGreater5 = (req, res, next) => {
  const { name } = req.body;
  if(name.length < magicNumbercinco) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }
  next();
};

const validateProductAlredyExist = async (req, res, next) => {
  const { name } = req.body;
  const findName = await findProductByName(name);
  if(findName.length > magicNumberzero) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }
  next();
};

const validateQuantityGreaterEqual0 = (req, res, next) => {
  const { quantity } = req.body;
  if(quantity < magicNumberzero || quantity === magicNumberzero) {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }
  next();
};

const validateQuantityNotString = (req, res, next) => {
  const { quantity } = req.body;
  const isString = typeof(quantity);
  if(isString === 'string') {
    return res.status(status422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }
  next();
};

const validateIdExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [{ _id }] = await findProductById(id);
    console.log(_id, id);
    if(JSON.stringify(_id) === id || !_id || !id) {
      return res.status(status422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
    };
  } catch { return res.status(status422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  });
  };
  next();
};

module.exports = {
  validateNameGreater5,
  validateProductAlredyExist,
  validateQuantityGreaterEqual0,
  validateQuantityNotString,
  validateIdExists
};
