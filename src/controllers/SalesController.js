const Product = require('../database/models/Product');
const Sales = require('../database/models/Sales');
const CreateSaleService = require('../services/CreateSaleService');
const ListSalesService = require('../services/ListSalesService');
const FindSaleByIDService = require('../services/FindSaleByIDService');
const UpdateSaleService = require('../services/UpdateSaleService');
const DeleteSaleByIDService = require('../services/DeleteSaleByIDService');

class SalesController {
  async create(request, response) {
    const products = request.body;

    const productModel = new Product();
    const salesModel = new Sales();
    const createSaleService = new CreateSaleService(salesModel, productModel);

    const newSale = await createSaleService.execute(products);

    const CREATED = 200;

    return response.status(CREATED).json(newSale);
  }

  async list(_request, response) {
    const salesModel = new Sales();
    const listSalesService = new ListSalesService(salesModel);

    const sales = await listSalesService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json({ sales });
  }

  async show(request, response) {
    const { id: saleID } = request.params;

    const salesModel = new Sales();
    const findSaleByIDService = new FindSaleByIDService(salesModel);

    const product = await findSaleByIDService.execute(saleID);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(product);
  }

  async update(request, response) {
    const { id } = request.params;
    const itensSold = request.body;

    const salesModel = new Sales();
    const updateSaleService = new UpdateSaleService(salesModel);

    const saleToUpdate = {
      id,
      itensSold,
    };

    const updatedSales = await updateSaleService.execute(saleToUpdate);

    const UPDATED = 200;

    return response.status(UPDATED).json(updatedSales);
  }

  async delete(request, response) {
    const { id: saleID } = request.params;

    const salesModel = new Sales();
    const deleteSaleByIDService = new DeleteSaleByIDService(salesModel);

    const deletedSale = await deleteSaleByIDService.execute(saleID);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(deletedSale);
  }
}

module.exports = SalesController;
