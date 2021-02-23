const service = require('../services/service');

const ok = 200;
const created = 201;
const invalidParams = 422;
const zero = 0;

const nameRefusedMsg = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
  }
};
const productExistingMsg = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists'
  }
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  if (quantity <= zero) return res.status(invalidParams)
    .json('"quantity" must be larger than or equal to 1');
  if (!Number.isInteger(quantity)) return res.status(invalidParams)
    .json('"quantity" must be a number');
  const nome = service.nameValid(name, quantity);
  if(!nome) return res.status(invalidParams).json(nameRefusedMsg);
  const repeated = await service.productRepeat(name);
  if(!repeated) return res.status(invalidParams).json(productExistingMsg);
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
