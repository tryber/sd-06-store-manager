const { Router } = require('express');
const SalesService = require('../services/SalesService');

const SUCCESS = 200;
const NOTFOUND = 404;
const UNPROCESSABLEENTITY = 422;

const SalesController = new Router();

// Desafio 5 - Cadastra uma venda
SalesController.post('/', async (req, res) => {
  const itensSold = req.body;
  const sale = await SalesService.createSale(itensSold);
  if (sale.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: sale.message
    }}
  );
  res.status(SUCCESS).json(sale);
});

// Desafio 6 - Listar todas as vendas
SalesController.get('/', async (req, res) => {
  const sales = await SalesService.getAllSales();
  res.status(SUCCESS).json(sales);
});

// Desafio 6 - Busca uma venda pelo id
SalesController.get('/:id', async (req, res) => {
  const sale = await SalesService.findByIdSale(req.params.id);
  if (sale.message) return res.status(NOTFOUND).json(
    { err: {
      code: 'not_found',
      message: sale.message
    }}
  );
  res.status(SUCCESS).json(sale);
});

// Desafio 7 - Atualizar uma venda pelo id
SalesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const sale = await SalesService.updateByIdSale(id, itensSold);
  if (sale.message) return res.status(UNPROCESSABLEENTITY).json(
    { err: {
      code: 'invalid_data',
      message: sale.message
    }}
  );
  res.status(SUCCESS).json(sale);
});

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
