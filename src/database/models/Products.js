const Crud = require('./Crud');
const { ObjectID } = require('mongodb');

const AppError = require('../../utils/AppError');
const { INVALID_DATA } = require('../../utils/errorCodes');
const { WRONG_DATA } = require('../../utils/errorStatus');

class Products extends Crud {
  constructor() {
    super('products');
  }

  async create(queryParams) {
    const productCreated = await super.create(queryParams);
    return productCreated;
  }

  async findOne(queryParams) {
    try {
      const product = await super.findOne(queryParams);
      return product;
    } catch (error) {
      throw new AppError({
        message: 'Wrong id format',
        code: INVALID_DATA
      }, WRONG_DATA);
    }
  }

  async update(productId, { name, quantity }) {

    const updateFields = {
      $set: {
        name,
        quantity
      }
    };

    const queryParams = {
      _id: ObjectID(productId)
    };

    const updatedProduct = await super.update(queryParams, updateFields);

    return updatedProduct;
  }
}

module.exports = Products;
