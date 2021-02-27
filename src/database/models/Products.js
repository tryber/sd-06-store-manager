const Crud = require('./Crud');

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
}

module.exports = Products;
