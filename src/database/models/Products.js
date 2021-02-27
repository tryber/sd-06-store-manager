// const AppError = require('../utils/AppError');
const Crud = require('./Crud');

class Products extends Crud {
  constructor() {
    super('products');
  }

  async create(queryParams) {
    const productCreated = await super.create(queryParams);
    return productCreated;
  }

  async list() {}

  async update() {}

  async delete() {}
}

module.exports = Products;
