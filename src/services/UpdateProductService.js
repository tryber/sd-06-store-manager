const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA, NOT_FOUND } = require('../errors/status');

class UpdateProductService {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async execute({ name, quantity, id }) {
    let productInfo;

    try {
      productInfo = await this.ProductModel.findByID(id);
    } catch (err) {
      const message = 'Wrong sale id format';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    if (!productInfo) {
      const message = 'Product not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    };

    const productWithSameNameExists = await this.ProductModel.findByName(name);

    if (productWithSameNameExists) {
      const message = 'Product already exists';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    const productToUpdateInfo = {
      id,
      name,
      quantity,
    };

    const updatedProduct = await this.ProductModel.update(productToUpdateInfo);

    return updatedProduct;
  }
}

module.exports = UpdateProductService;
