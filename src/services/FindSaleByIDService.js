const AppError = require('../errors/AppError');
const { INVALID_DATA, NOT_FOUND: NOT_FOUND_CODE } = require('../errors/codes');
const { BAD_DATA, NOT_FOUND } = require('../errors/status');

class FindSaleByIDService {
  constructor(SalesModel) {
    this.SalesModel = SalesModel;
  }

  async execute(id) {
    let saleInfo;

    try {
      saleInfo = await this.SalesModel.findByID(id);
    } catch (err) {
      const message = 'Sale not found';

      const errorInfo = {
        message,
        code: NOT_FOUND_CODE
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    if (!saleInfo) {
      const message = 'Sale not found';

      const errorInfo = {
        message,
        code: NOT_FOUND_CODE
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    return saleInfo;
  }
}

module.exports = FindSaleByIDService;
