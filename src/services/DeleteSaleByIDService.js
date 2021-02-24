const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA, NOT_FOUND } = require('../errors/status');

class DeleteSaleByIDService {
  constructor(SalesModel, ProductModel) {
    this.SalesModel = SalesModel;
    this.ProductModel = ProductModel;
  }

  async execute(id) {
    let saleInfo;

    try {
      saleInfo = await this.SalesModel.findByID(id);
    } catch (err) {
      const message = 'Wrong sale ID format';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    if (!saleInfo) {
      const message = 'Sale not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    await this.SalesModel.deleteByID(id);

    const { itensSold } = saleInfo;

    for await (const product of itensSold) {
      const { productId, quantity: backFromDeletedSaleQuantity } = product;

      const currentProductInfo = await this.ProductModel.findByID(productId);

      const { quantity: toUpdateQuantity } = currentProductInfo;

      const newQuantity = toUpdateQuantity + backFromDeletedSaleQuantity;

      const updatedProductInfo = {
        ...currentProductInfo,
        id: productId,
        quantity: newQuantity,
      };

      await this.ProductModel.update(updatedProductInfo);
    }

    return saleInfo;
  }
}

module.exports = DeleteSaleByIDService;
