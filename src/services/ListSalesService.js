const { Sales }= require('../database/index');
const AppError = require('../utils/AppError');

const { INVALID_DATA } = require('../utils/errorCodes');
const { WRONG_DATA } = require('../utils/errorStatus');

class ListSalesService {
  async execute() {

    const salesModel = new Sales();

    const sales = await salesModel.findAll();

    return sales;
  }
}

module.exports = ListSalesService;
