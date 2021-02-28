const service = require('../services/service');
const {
  OK,
  created,
  notFound,
  invalidParams,
  zero,
  cinco,
  vinteQuatro,
  nameRefusedMsg,
  productExistingMsg,
  quantityGtZero,
  quantityNaN,
  wrongId,
  salesWrong,
  saleNotFound,
  saleIdWrong,
  stockProblem
} = require('../utils/messages');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  if (quantity <= zero) return res.status(invalidParams).json(quantityGtZero);
  // if (!Number.isInteger(quantity)) return res.status(invalidParams).json(quantityNaN);
  if (typeof quantity !== 'number') return res.status(invalidParams).json(quantityNaN);
  const nome = service.nameValid(name, quantity);
  if(!nome) return res.status(invalidParams).json(nameRefusedMsg);
  const repeated = await service.productRepeat(name);
  if(!repeated) return res.status(invalidParams).json(productExistingMsg);
  const produto = await service.productCreate(name, quantity);
  res.status(created).json(produto);
};

const getAllProducts = async (_req, res) => {
  const products = await service.getAllProducts();
  res.status(OK).json({ products: products });
};

const findByIdProducts = async (req, res) => {
  const { id } = req.params;
  if(id.length !== vinteQuatro) return res.status(invalidParams).json(wrongId);
  const product = await service.findByIdProducts(id);
  if (!product) return res.status(invalidParams).json(wrongId);
  res.status(OK).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  if (name.length < cinco) return res.status(invalidParams).json(nameRefusedMsg);
  if (quantity <= zero) return res.status(invalidParams).json(quantityGtZero);
  if (typeof quantity !== 'number') return res.status(invalidParams)
    .json(quantityNaN);
  const product = await service.findByIdProducts(id);
  if(!product === null)return res.status(invalidParams)
    .json({ message: 'produto not found' });
  await service.updateProduct(id, name, quantity);
  res.status(OK).json({ _id: id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  if(id.length !== vinteQuatro) return res.status(invalidParams).json(wrongId);
  const product = await service.findByIdProducts(id);
  if(!product === null) return res.status(invalidParams)
    .json({ message: 'produto not found' });
  await service.deleteProduct(id, name, quantity);
  res.status(OK).json({ _id: id, name, quantity });    
};

const quantitySold = (req, res, next) => {
  const listSolds = req.body;
  listSolds.some(list => {
    if (list.quantity <= zero || typeof list.quantity !== 'number')
      return res.status(invalidParams).json(salesWrong);
  });
  next();
};

const createSales = async (req, res) => {
  const listSolds = req.body;
  const [{ productId, quantity }] = listSolds;
  if (quantity <= zero) return res.status(invalidParams).json(salesWrong); 
  const product = await service.findByIdProducts(productId);
  let stockQt = product.quantity - quantity;
  if (stockQt <= zero) return res.status(notFound).json(stockProblem);
  const sold = await service.createSales(listSolds);
  res.status(OK).json(sold);
};

const getAllSales = async (_req, res) => {
  const sales = await service.getAllSales();
  res.status(OK).json({ sales: sales });
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  if(id.length !== vinteQuatro) return res.status(notFound).json(saleNotFound);
  const sale = await service.findSalesById(id);
  if (!sale) return res.status(notFound).json(saleNotFound);
  res.status(OK).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  if(id.length !== vinteQuatro) return res.status(invalidParams).json(saleIdWrong);
  const saleDeleted = await service.findSalesById(id);
  if(!saleDeleted === null) return res.status(invalidParams).json(saleIdWrong);
  await service.deleteSale(id);
  res.status(OK).json(saleDeleted);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { itensSold: [ { productId, quantity }] } = req.body;
  if (quantity <= zero) return res.status(invalidParams).json(salesWrong);
  if (typeof quantity !== 'number') return res.status(invalidParams)
    .json(invalidParams);
  const saleUpdated = await service.findSalesById(id);
  if(!saleUpdated === null) return res.status(invalidParams).json(salesWrong);
  await service.updateSale(id, productId, quantity);
  res.status(OK).json(id, productId, quantity);
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProducts,
  updateProduct,
  deleteProduct,
  createSales,
  quantitySold,
  getAllSales,
  findSalesById,
  deleteSale,
  updateSale
};
