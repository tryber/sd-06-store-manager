const {
  CreateProductService,
  ListProductsService,
  GetProductByIdService
} = require('../services/index');

class ProductsController {
  async create(req, res) {
    const createProductService = new CreateProductService();

    const productCreated = await createProductService.execute(req.body);

    const PRODUCT_CREATED = 201;

    return res.status(PRODUCT_CREATED).json(productCreated);
  }

  async list(req, res) {
    const listProductService = new ListProductsService();

    const products = await listProductService.execute();

    const PRODUCT_FOUND = 200;

    return res.status(PRODUCT_FOUND).json({ products });
  }

  async show(req, res) {
    const { id } = req.params;

    const getProductByIdService = new GetProductByIdService();

    const productFound = await getProductByIdService.execute(id);

    const PRODUCT_FOUND = 200;

    return res.status(PRODUCT_FOUND).json(productFound);
  }

  update(req, res) {}

  delete(req, res) {}
}

module.exports = ProductsController;
