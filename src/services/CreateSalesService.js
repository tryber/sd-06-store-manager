const { Products, Sales }= require('../database/index');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');

class CreateSalesService {
  async execute(sales) {

    const productModel = new Products();
    const salesModel = new Sales();

    for (const product of sales) {
      const productAlreadyExists = await productModel
        .findOne({ _id: product.productId });

      if (!productAlreadyExists) {
        const error = {
          message: 'Wrong product ID or invalid quantity',
          code: INVALID_DATA
        };

        throw new AppError(error, WRONG_DATA);
      }
    }

    const salesCreated = await salesModel.create(sales);

    return salesCreated;
  }
}

module.exports = CreateSalesService;
