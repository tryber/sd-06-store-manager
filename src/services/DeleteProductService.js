const { Products }= require('../database/index');

class DeleteProductService {
  async execute(productId) {

    const productModel = new Products();

    await productModel.delete(productId);
  }
}

module.exports = DeleteProductService;
