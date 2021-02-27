const { Sales }= require('../database/index');
const AppError = require('../utils/AppError');

const { NOT_FOUND: SALE_NOT_FOUND } = require('../utils/errorCodes');
const { NOT_FOUND } = require('../utils/errorStatus');

class GetSalesByIdService {
  async execute(salesId) {

    const salesModel = new Sales();
    let sale;
    try {
      sale = await salesModel.findOne({ _id: salesId });
    } catch (error) {
      throw new AppError({
        message: 'Sale not found',
        code: SALE_NOT_FOUND
      }, NOT_FOUND);
    }

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
