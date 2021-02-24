const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA } = require('../errors/status');

class CreateProductService {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async execute({ name, quantity }) {
    const productExists = await this.ProductModel.findByName(name);

    if (productExists) {
      const message = 'Product already exists';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    const productToCreateInfo = {
      name,
      quantity,
    };

    const newProduct = await this.ProductModel.create(productToCreateInfo);

    return newProduct;
  }
}

module.exports = CreateProductService;
