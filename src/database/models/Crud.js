const connection = require('../connection');

// const AppError = require('../utils/AppError');

class Crud {
  constructor(model) {
    this.Model = model;
  }
  async create(queryParams) {
    const db = await connection();

    const modelInfo = await db.collection(this.Model).insertOne(queryParams);

    const [model] = modelInfo.ops;
    return model;
  }

  async findOne(queryParams) {
    const db = await connection();

    const modelInfo = await db.collection(this.Model).findOne(queryParams);

    return modelInfo;
  }

  async update() {}

  async delete() {}
}

module.exports = Crud;
