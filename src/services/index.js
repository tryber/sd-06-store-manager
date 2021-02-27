const CreateProductService = require('./CreateProductService');
const GetProductByIdService = require('./GetProductByIdService');
const DeleteProductService = require('./DeleteProductService');
const ListProductsService = require('./ListProductsService');
const UpdateProductService = require('./UpdateProductService');

const CreateSalesService = require('./CreateSalesService');
const ListSalesService = require('./ListSalesService');
const GetSalesByIdService = require('./GetSalesByIdService');

module.exports = {
  CreateProductService,
  DeleteProductService,
  GetProductByIdService,
  ListProductsService,
  UpdateProductService,
  CreateSalesService,
  ListSalesService,
  GetSalesByIdService
};
