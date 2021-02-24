const service = require('../services/service');

const ok = 200;
const created = 201;
const invalidParams = 422;
const zero = 0;

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

const create = async (req, res) => {
  const { name, quantity } = req.body;
  if (quantity <= zero) return res.status(invalidParams).json(quantityGtZero);
  // if (!Number.isInteger(quantity)) return res.status(invalidParams).json(quantityNaN);
  if (typeof quantity !== 'number') return res.status(invalidParams).json(quantityNaN);
  console.log(typeof quantity);
  const nome = service.nameValid(name, quantity);
  if(!nome) return res.status(invalidParams).json(nameRefusedMsg);
  const repeated = await service.productRepeat(name);
  if(!repeated) return res.status(invalidParams).send(productExistingMsg);
  const produto = await service.create(name, quantity);
  res.status(created).json(produto);
};

const getAll = async (_req, res) => {
  const products = await service.getAll();
  res.status(ok).json(products);
};

module.exports = {
  create,
  getAll
};
