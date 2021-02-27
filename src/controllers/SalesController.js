const {
  CreateSalesService,
  ListSalesService,
  GetSalesByIdService
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

    const getProductByIdService = new GetProductByIdService();

    const updateProductService = new UpdateProductService();

    await getProductByIdService.execute(id);

    const updatedProduct = await updateProductService.execute(id, req.body);

    const PRODUCT_UPDATED = 200;

    return res.status(PRODUCT_UPDATED).json(updatedProduct);
  }

  async delete(req, res) {
    const { id } = req.params;

    const getProductByIdService = new GetProductByIdService();

    const deleteProductService = new DeleteProductService();

    const productDeleted = await getProductByIdService.execute(id);

    await deleteProductService.execute(id, req.body);

    const PRODUCT_DELETED = 200;

    return res.status(PRODUCT_DELETED).json(productDeleted);
  }
}

module.exports = SalesController;
