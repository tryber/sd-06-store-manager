class ListProductService {
  constructor(ProductModel) {
    this.ProductModel = ProductModel;
  }

  async execute() {
    const allProducts = await this.ProductModel.listAll();

    return allProducts;
  }
}

module.exports = ListProductService;
