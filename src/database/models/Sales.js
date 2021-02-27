const Crud = require('./Crud');
const { ObjectID } = require('mongodb');

const AppError = require('../../utils/AppError');

const { INVALID_DATA } = require('../../utils/errorCodes');
const { WRONG_DATA } = require('../../utils/errorStatus');

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

  // async findOne(queryParams) {
  //   try {
  //     const sale = await super.findOne(queryParams);
  //     return sale;
  //   } catch (error) {
  //     throw new AppError({
  //       message: 'Wrong sale ID format',
  //       code: INVALID_DATA
  //     }, WRONG_DATA);
  //   }
  // }

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
