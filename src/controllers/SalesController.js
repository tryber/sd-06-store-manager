const {
  CreateSalesService,
  ListSalesService,
  GetSalesByIdService,
  UpdateSaleService
} = require('../services/index');

class SalesController {
  async create(req, res) {
    const createSalesService = new CreateSalesService();

    const salesCreated = await createSalesService.execute(req.body);

    const SALES_CREATED = 200;

    return res.status(SALES_CREATED).json(salesCreated);
  }

  async list(_req, res) {
    const listSalesService = new ListSalesService();

    const sales = await listSalesService.execute();

    const SALES_FOUND = 200;

    return res.status(SALES_FOUND).json({ sales });
  }

  async show(req, res) {
    const { id } = req.params;

    const getSalesByIdService = new GetSalesByIdService();

    const saleFound = await getSalesByIdService.execute(id);

    const SALE_FOUND = 200;

    return res.status(SALE_FOUND).json(saleFound);
  }

  async update(req, res) {
    const { id } = req.params;

    const getSalesByIdService = new GetSalesByIdService();

    const updateSaleService = new UpdateSaleService();

    await getSalesByIdService.execute(id);

    const updatedProduct = await updateSaleService.execute(id, req.body);

    const SALE_UPDATED = 200;

    return res.status(SALE_UPDATED).json(updatedProduct);
  }

  async delete(req, res) {
    const { id } = req.params;

    const getSalesByIdService = new GetSalesByIdService();

    const deleteProductService = new DeleteProductService();

    const saleDeleted = await getSalesByIdService.execute(id);

    await deleteProductService.execute(id, req.body);

    const PRODUCT_DELETED = 200;

    return res.status(PRODUCT_DELETED).json(saleDeleted);
  }
}

module.exports = SalesController;
