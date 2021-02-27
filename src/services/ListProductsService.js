const { Products }= require('../database/index');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');

class ListProductsService {
  async execute() {

    const productModel = new Products();

    const products = await productModel.findAll();

    return products;
  }
}

module.exports = ListProductsService;
