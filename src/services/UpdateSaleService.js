const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA } = require('../errors/status');

const baseMessage = 'Wrong product ID or invalid quantity';

class UpdateProductService {
  constructor(SalesModel) {
    this.SalesModel = SalesModel;
  }

  async execute({ itemsSold, id }) {
    let saleInfo;

    try {
      saleInfo = await this.SalesModel.findByID(id);
    } catch (err) {
      const errorInfo = {
        message: baseMessage,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    if (!saleInfo) {
      const message = 'Product not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    };

    const toUpdateSale = {
      id,
      itemsSold,
    };

    const updatedSales = await this.SalesModel.update(toUpdateSale);

    return updatedSales;
  }
}

module.exports = UpdateProductService;
