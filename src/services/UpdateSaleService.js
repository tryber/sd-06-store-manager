const { Sales, Products }= require('../database/index');

class UpdateSaleService {
  async execute(saleId, itensSold) {

    const salesModel = new Sales();
    const productModel = new Products();

    for (const product of itensSold) {
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

    const updatedSale = await salesModel.update(saleId, itensSold);

    return updatedSale;
  }
}

module.exports = UpdateSaleService;
