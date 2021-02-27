const { Products }= require('../database/index');

class UpdateProductService {
  async execute(productId, { name, quantity }) {

    const productModel = new Products();

    const queryParams = {
      $set: {
        name,
        quantity
      }
    };

    const products = await productModel.update(productId, queryParams);

    return products;
  }
}

module.exports = UpdateProductService;
