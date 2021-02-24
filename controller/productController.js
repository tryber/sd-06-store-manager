const { Router } = require('express');
const {
  createProduct,
  ProductList,
  findById,
  update,
  remove
} = require('../service/productService');

const productController = new Router();
const { ObjectId } = require('mongodb');
const { validateCreate, rightId, nameExist } = require('../middleware/storeMiddleware');


productController.get('/', async (_req, res) => {
  const list = await ProductList();
  const okay = 200;
  res.status(okay).json({ products: list });
});

productController.get('/:id', rightId, async (req, res) => {
  const { id } = req.params;
  const okay = 200;
  const productById = await findById(id);

  res.status(okay).json(productById);
});

productController.post('/', validateCreate, nameExist, async (req, res) => {
  const deBoa = 201;
  const product = req.body;
  const { ops } = await createProduct(product);

  res.status(deBoa).json(ops[0]);
});
productController.put('/:id', validateCreate, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const okay = 200;
  const productUp = await update(id, name, quantity);

  res.status(okay).json({ _id: id, name: name, quantity: quantity });
});
productController.delete('/:id', rightId, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const okay = 200;
  const removeProduct = await remove(id);

  res.status(okay).json(removeProduct); // Lembrar de perguntar ao ZAmbelli sobre essa saida.

});

module.exports = productController;