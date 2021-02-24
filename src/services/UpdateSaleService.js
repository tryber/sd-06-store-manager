const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { NOT_FOUND } = require('../errors/status');

const addToUpdateQuantityToMissingProducts =
  require('../utils/addToUpdateQuantityToMissingProducts');

const updateProductsQuantity = require('../utils/updateProductsQuantity');
const addToUpdateQuantityToProducts = require('../utils/addToUpdateQuantityToProducts');
const addProductOrUpdateProductList = require('../utils/addProductOrUpdateProductList');

const baseMessage = 'Wrong product ID or invalid quantity';

class UpdateSaleService {
  constructor(SalesModel, ProductModel) {
    this.SalesModel = SalesModel;
    this.ProductModel = ProductModel;
  }

  async execute({ itensSold, id }) {
    let saleInfo;

    try {
      saleInfo = await this.SalesModel.findByID(id);
    } catch (err) {
      const errorInfo = {
        message: baseMessage,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    if (!saleInfo) {
      const message = 'Sale not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    };

    const { itensSold: salePreviousItens } = saleInfo;

    let allProductsHaveValidIDsAndQuantities = true;

    let aggregatedProducts = [...salePreviousItens];

    for await (const newSaleProductInfo of itensSold) {
      let productInfo;

      const { productId: newSaleId, quantity: newSaleQuantity } = newSaleProductInfo;

      const productWasPreviouslyOnSale = aggregatedProducts.find(prod => (
        prod.productId === newSaleId
      ));

      const MIN_QTD = 0;

      const oldQuantity = (
        (productWasPreviouslyOnSale && productWasPreviouslyOnSale.quantity) || MIN_QTD
      );

      try {
        productInfo = await this.ProductModel.findByID(newSaleId);

        const { quantity: existingQuantity } = productInfo;

        const toUpdateQuantity = newSaleQuantity - oldQuantity;

        const quantityDifference = existingQuantity - toUpdateQuantity;

        const existingQuantityIsEnoughToSell = (
          quantityDifference >= MIN_QTD
        );

        if (!existingQuantityIsEnoughToSell) {
          allProductsHaveValidIDsAndQuantities = false;
        }

        aggregatedProducts = addProductOrUpdateProductList({
          productList: aggregatedProducts,
          productToUpdate: newSaleProductInfo,
          shouldUpdate: productWasPreviouslyOnSale,
          toUpdateQuantity,
        });
      } catch (err) {
        allProductsHaveValidIDsAndQuantities = false;
      }
    }

    if (!allProductsHaveValidIDsAndQuantities) {
      const errorInfo = {
        message: baseMessage,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    aggregatedProducts = addToUpdateQuantityToMissingProducts(aggregatedProducts);

    for await (const prodToUpdate of aggregatedProducts) {
      const { productId, toUpdateQuantity } = prodToUpdate;

      if (toUpdateQuantity) {
        const productInfo = await this.ProductModel.findByID(productId);

        const updatedProductInfo = updateProductsQuantity(productInfo, toUpdateQuantity);

        await this.ProductModel.update(updatedProductInfo);
      }
    }

    const toUpdateSale = {
      id,
      itensSold,
    };

    const updatedSales = await this.SalesModel.update(toUpdateSale);

    return updatedSales;
  }
}

module.exports = UpdateSaleService;
