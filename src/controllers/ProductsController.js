const { CreateProductService, HelloWorldService } = require('../services/index');

class ProductsController {
  async create(req, res) {
    const createProductService = new CreateProductService();

    const productCreated = await createProductService.execute(req.body);

    const PRODUCT_CREATED = 201;

    return res.status(PRODUCT_CREATED).json(productCreated);
  }

  list(req, res) {}

  update(req, res) {}

  delete(req, res) {}
}

module.exports = ProductsController;
