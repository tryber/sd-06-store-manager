const { Sales }= require('../database/index');
const AppError = require('../utils/AppError');

const { NOT_FOUND: SALE_NOT_FOUND } = require('../utils/errorCodes');
const { NOT_FOUND } = require('../utils/errorStatus');

class GetSalesByIdService {
  async execute(salesId) {

    const salesModel = new Sales();

    const sale = await salesModel.findOne({ _id: salesId });

    if (!sale) {
      throw new AppError({
        message: 'Sale not found',
        code: SALE_NOT_FOUND
      }, NOT_FOUND);
    }

    return sale;
  }
}

module.exports = GetSalesByIdService;
