const { Products }= require('../database/index');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');

class GetProductByIdService {
  async execute(productId) {

    const productModel = new Products();

    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      throw new AppError({
        message: 'Wrong id format',
        code: INVALID_DATA
      }, WRONG_DATA);
    }

    return product;
  }
}

module.exports = GetProductByIdService;
