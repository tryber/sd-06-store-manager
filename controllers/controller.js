const service = require('../services/service');

const OK = 200;
const created = 201;
const invalidParams = 422;
const zero = 0;
const cinco = 5;
const vinteQuatro = 24;

const msgError = (string) => {
  return {
    err: {
      code: 'invalid_data',
      message: string,
    }
  };
};
const nameRefusedMsg = (msgError('"name" length must be at least 5 characters long'));
const productExistingMsg = (msgError('Product already exists'));
const quantityGtZero = (msgError('"quantity" must be larger than or equal to 1'));
const quantityNaN = (msgError('"quantity" must be a number'));
const wrongId = (msgError('Wrong id format'));

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
  if (!product)  return res.status(invalidParams).json(wrongId);;
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
  if(!product === null)return res.status(invalidParams)
    .json({ message: 'produto not found' });
  await service.deleteProduct(id, name, quantity);
  res.status(OK).json({ _id: id, name, quantity });    
};

module.exports = {
  createProduct,
  getAllProducts,
  findByIdProducts,
  updateProduct,
  deleteProduct
};
