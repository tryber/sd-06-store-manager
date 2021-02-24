const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA, NOT_FOUND } = require('../errors/status');

class FindProductByIDService {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async execute(id) {
    let productInfo;

    try {
      productInfo = await this.ProductModel.findByID(id);
    } catch (err) {
      const message = 'Wrong id format';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    if (!productInfo) {
      const message = 'Product not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    return productInfo;
  }
}

module.exports = FindProductByIDService;
