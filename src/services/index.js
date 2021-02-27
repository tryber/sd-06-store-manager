const CreateProductService = require('./CreateProductService');
const GetProductByIdService = require('./GetProductByIdService');
const DeleteProductService = require('./DeleteProductService');
const ListProductsService = require('./ListProductsService');
const UpdateProductService = require('./UpdateProductService');

const CreateSalesService = require('./CreateSalesService');
const ListSalesService = require('./ListSalesService');
const GetSalesByIdService = require('./GetSalesByIdService');
const UpdateSaleService = require('./UpdateSaleService');

module.exports = {
  CreateProductService,
  DeleteProductService,
  GetProductByIdService,
  ListProductsService,
  UpdateProductService,
  CreateSalesService,
  ListSalesService,
  GetSalesByIdService,
  UpdateSaleService
};
