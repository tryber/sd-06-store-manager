const { Products }= require('../database/index');

class UpdateProductService {
  async execute(productId, { name, quantity }) {

    const productModel = new Products();

    const updatedProduct = await productModel.update(productId, { name, quantity });

    return updatedProduct;
  }
}

module.exports = UpdateProductService;
