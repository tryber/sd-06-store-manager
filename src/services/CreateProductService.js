const { Products }= require('../database/index');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');

class CreateProductService {
  async execute(queryParams) {

    const productModel = new Products();

    const productAlreadyExists = await productModel.findOne({ name: queryParams.name });

    if (productAlreadyExists) {
      const error = {
        message: 'Product already exists',
        code: INVALID_DATA
      };

      throw new AppError(error, WRONG_DATA);
    }

    const productCreated = await productModel.create(queryParams);

    return productCreated;
  }
}

module.exports = CreateProductService;
