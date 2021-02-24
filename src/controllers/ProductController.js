const Product = require('../database/models/Product');
const CreateProductService = require('../services/CreateProductService');
const ListProductsService = require('../services/ListProductsService');
const FindProductByIDService = require('../services/FindProductByIDService');
const UpdateProductService = require('../services/UpdateProductService');
const DeleteProductByIDService = require('../services/DeleteProductByIDService');

class ProductController {
  async create(request, response) {
    const { name, quantity } = request.body;

    const productModel = new Product();
    const createProductService = new CreateProductService(productModel);

    const productToCreate = {
      name,
      quantity,
    };

    const newProduct = await createProductService.execute(productToCreate);

    const CREATED = 201;

    return response.status(CREATED).json(newProduct);
  }

  async list(_request, response) {
    const productModel = new Product();
    const listProductsService = new ListProductsService(productModel);

    const products = await listProductsService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json({ products });
  }

  async show(request, response) {
    const { id: productID } = request.params;

    const productModel = new Product();
    const findProductByIDService = new FindProductByIDService(productModel);

    const product = await findProductByIDService.execute(productID);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(product);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, quantity } = request.body;

    const productModel = new Product();
    const updateProductService = new UpdateProductService(productModel);

    const productToUpdate = {
      id,
      name,
      quantity,
    };

    const newProductInfo = await updateProductService.execute(productToUpdate);

    const UPDATED = 200;

    return response.status(UPDATED).json(newProductInfo);
  }

  async delete(request, response) {
    const { id: productID } = request.params;

    const productModel = new Product();
    const deleteProductByIDService = new DeleteProductByIDService(productModel);

    const deletedProduct = await deleteProductByIDService.execute(productID);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(deletedProduct);
  }
}

module.exports = ProductController;
