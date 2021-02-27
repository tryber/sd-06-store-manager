const AppError = require('../utils/AppError');
const { Sales }= require('../database/index');

const { INVALID_DATA } = require('../utils/errorCodes');
const { NOT_FOUND, WRONG_DATA } = require('../utils/errorStatus');

class DeleteSaleService {
  async execute(saleId) {

    const salesModel = new Sales();

    let sale;
    try {
      sale = await salesModel.findOne({ _id: saleId });
    } catch (error) {
      throw new AppError({
        message: 'Wrong sale ID format',
        code: INVALID_DATA
      }, WRONG_DATA);
    }

    if (!sale) {
      throw new AppError({
        message: 'Sale not found',
        code: INVALID_DATA
      }, NOT_FOUND);
    }


    await salesModel.delete(saleId);

    return sale;
  }
}

module.exports = DeleteSaleService;
