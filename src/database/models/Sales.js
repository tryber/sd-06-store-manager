const Crud = require('./Crud');

class Sales extends Crud {
  constructor() {
    super('sales');
  }

  async create(queryParams) {
    const saleCreated = await super.create(queryParams);
    return saleCreated;
  }

  async list() {}

  async update() {}

  async delete() {}
}

module.exports = Sales;
