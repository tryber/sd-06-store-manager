const { Router } = require('express');
const {
  createProduct,
  ProductList,
  findById,
  update,
  remove,
  createSales
} = require('../service/storeService');

const saleController = new Router();
const { ObjectId } = require('mongodb');
const {
  validateCreate,
  rightId, nameExist,
  checkQuantitySold
} = require('../middleware/storeMiddleware');

/*productController.get('/', async (_req, res) => {
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
*/
saleController.post('/', checkQuantitySold, async (req, res) => {
  const deBoa = 200;
  const products = req.body;
  const { ops } = await createSales(products);

  res.status(deBoa).json(ops[0]);
});
/*productController.put('/:id', validateCreate, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const okay = 200;
  const productUp = await update(id, name, quantity);

  res.status(okay).json({ _id: id, name: name, quantity: quantity });
});
productController.delete('/:id', rightId, async (req, res) => {
  const { id } = req.params;
  const deleData = await findById(id);
  const okay = 200;
  const removeProduct = await remove(id);

  res.status(okay).json(deleData);
});
*/
module.exports = saleController;