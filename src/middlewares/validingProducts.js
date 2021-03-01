const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const nomeLength = 5;
const quantityValue = 0;
const CREATED = 201;
const OK = 200;
const deuRuin= 422;

const validingName = async (req, res, next) => {
  const {name} = req.body;
  const seeProduct = await productModel.getFindByName({ name });
  if (name.length <= nomeLength) {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long'
        }
      }
    );
  }

  if (seeProduct) {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': 'Product already exists'
        }
      }
    );
  }
  next();
};

const validingQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= quantityValue) {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1'
        }
      }
    );
  }

  if (typeof quantity !== 'number') {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': '"quantity" must be a number'
        }
      }
    );
  }
  next();
};

const validingId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': 'Wrong id format'
        }
      }
    );
  }
  next();
};

module.exports = {
  validingName,
  validingQuantity,
  validingId,
};
