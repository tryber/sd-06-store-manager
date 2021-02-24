const Product = require('../database/models/Product');
const Sales = require('../database/models/Sales');
const CreateSaleService = require('../services/CreateSaleService');
const ListSalesService = require('../services/ListSalesService');
const FindSaleByIDService = require('../services/FindSaleByIDService');
const UpdateSaleService = require('../services/UpdateSaleService');
// const DeleteProductByIDService = require('../services/DeleteProductByIDService');

class SalesController {
  async create(request, response) {
    const products = request.body;

    const productModel = new Product();
    const salesModel = new Sales();
    const createSaleService = new CreateSaleService(salesModel, productModel);

    const newSale = await createSaleService.execute(products);

    const CREATED = 201;

    return response.status(CREATED).json(newSale);
  }

  async list(_request, response) {
    const salesModel = new Sales();
    const listSalesService = new ListSalesService(salesModel);

    const products = await listSalesService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json(products);
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
    const itemsSold = request.body;

    const salesModel = new Sales();
    const updateSaleService = new UpdateSaleService(salesModel);

    const saleToUpdate = {
      id,
      itemsSold,
    };

    const newProductInfo = await updateSaleService.execute(saleToUpdate);

    const UPDATED = 201;

    return response.status(UPDATED).json(newProductInfo);
  }

  async delete(request, response) {
    const { id: saleID } = request.params;

    const salesModel = new Sales();
    const deleteProductByIDService = new DeleteProductByIDService(salesModel);

    const deletedSale = await deleteProductByIDService.execute(saleID);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(deletedSale);
  }
}

module.exports = SalesController;
