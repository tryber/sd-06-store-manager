const { Router } = require('express');
const SalesService = require('../services/SalesService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLEENTITY = 422;

const SalesController = new Router();

// Desafio 5 - Cadastra uma venda
SalesController.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  const sale = await SalesService.createSale(productId, quantity);
  if (sale.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: product.message
    }}
  );
  res.status(CREATED).json(sale);
});

// // Desafio 2 - Busca todos os produtos
// ProductController.get('/', async (req, res) => {
//   res.status(SUCCESS).json(await ProductService.getAllProducts());
// });

// // Desafio 2 - Busca um produto pelo id
// ProductController.get('/:id', async (req, res) => {
//   const product = await ProductService.findByIdProduct(req.params.id);
//   if (product.message) return res.status(UNPROCESSABLEENTITY).json(
//     { err: {
//       code: 'invalid_data',
//       message: product.message
//     }}
//   );
//   res.status(SUCCESS).json(product);
// });

// // Desafio 3 - Atualizar um produto pelo id
// ProductController.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const product = await ProductService.updateByIdProduct(id, name, quantity);
//   if (product.message) return res.status(UNPROCESSABLEENTITY).json(
//     { err: {
//       code: 'invalid_data',
//       message: product.message
//     }}
//   );
//   res.status(SUCCESS).json(product);
// });

// // Desafio 4 - Deletar um produto pelo id
// ProductController.delete('/:id', async (req, res)  => {
//   const { id } = req.params;
//   const product = await ProductService.deleteByIdProduct(id);
//   if (product.message) return res.status(UNPROCESSABLEENTITY).json(
//     { err: {
//       code: 'invalid_data',
//       message: product.message
//     }}
//   );
//   res.status(SUCCESS).json(product);
// });

module.exports = SalesController;
