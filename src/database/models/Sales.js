const Crud = require('./Crud');
const { ObjectID } = require('mongodb');

const AppError = require('../../utils/AppError');

const { NOT_FOUND: SALE_NOT_FOUND } = require('../../utils/errorCodes');
const { NOT_FOUND } = require('../../utils/errorStatus');

class Sales extends Crud {
  constructor() {
    super('sales');
  }

  async create(queryParams) {
    const sale = {
      itensSold: [ ...queryParams ]
    };
    const salesCreated = await super.create(sale);
    return salesCreated;
  }

  async findOne(queryParams) {
    try {
      const sale = await super.findOne(queryParams);
      return sale;
    } catch (error) {
      throw new AppError({
        message: 'Sale not found',
        code: SALE_NOT_FOUND
      }, NOT_FOUND);
    }
  }

  async update(saleId, itensSold) {

    const updateFields = {
      $set: {
        itensSold
      }
    };

    const queryParams = {
      _id: ObjectID(saleId)
    };

    const updatedProduct = await super.update(queryParams, updateFields);

    return updatedProduct;
  }
}

module.exports = Sales;
