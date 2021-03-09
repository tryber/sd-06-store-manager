const { Router } = require('express');
const Products = require('../models/Products');
const validation = require('../middlewares/validations');

const controlProducts = new Router();

const falha = 201;
const sucesso = 200;

controlProducts.post('/', validation.nameValidation, validation.quantityValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { insertedId } = await Products.addProduct(name, quantity);
    const addedProduct = {
      _id: insertedId,
      name,
      quantity,
    };
    res.status(falha).json(addedProduct);
  }
);

controlProducts.get('/', async (_req, res) => {
  const everyProducts = await Products.getProducts();
  return res.status(sucesso).json({ products: everyProducts });
});

controlProducts.get('/:id', validation.idValidation, async (req, res) => {
  const { id } = req.params;

  const product = await Products.getById(id);
  return res.status(sucesso).json(product);
});

module.exports = controlProducts;
