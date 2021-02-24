class ListSalesService {
  constructor(SalesModel) {
    this.SalesModel = SalesModel;
  }

  async execute() {
    const allSales = await this.SalesModel.listAll();

    return allSales;
  }
}

module.exports = ListSalesService;
