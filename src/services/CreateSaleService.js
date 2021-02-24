const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA } = require('../errors/status');

const baseMessage = 'Wrong product ID or invalid quantity';

class CreateSaleService {
  constructor(SalesModel, ProductModel) {
    this.SalesModel = SalesModel;
    this.ProductModel = ProductModel;
  }

  async execute(products) {
    let allProductsHaveValidIDsAndQuantities = true;

    for await (const product of products) {
      let productInfo;

      try {
        productInfo = await this.ProductModel.findByID(product.productId);

        const { quantity: existingQuantity } = productInfo;

        const quantityDifference = existingQuantity - product.quantity;
        const MIN_PRODUCT_QUANTITY = 0;

        const existingQuantityIsEnoughToSell = (
          quantityDifference >= MIN_PRODUCT_QUANTITY
        );

        if (!existingQuantityIsEnoughToSell) {
          allProductsHaveValidIDsAndQuantities = false;
        }
      } catch (err) {
        allProductsHaveValidIDsAndQuantities = false;
      }
    }


    if (!allProductsHaveValidIDsAndQuantities) {
      const errorInfo = {
        message: baseMessage,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    for await (const product of products) {
      const productInfo = await this.ProductModel.findByID(product.productId);

      const newQuantity = productInfo.quantity - product.quantity;

      const productWithQuantityUpdated = {
        ...productInfo,
        id: productInfo._id,
        quantity: newQuantity,
      };

      await this.ProductModel.update(productWithQuantityUpdated);
    }

    const sale = await this.SalesModel.create(products);

    return sale;
  }
}

module.exports = CreateSaleService;
