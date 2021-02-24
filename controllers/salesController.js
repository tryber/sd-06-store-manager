const express = require('express');

const salesRouter = express.Router();

const SUCCESS = 200;

salesRouter.get('/', (request, response) => {
  return response.status(SUCCESS).json({ message: 'listar todos os vendas'});
});

salesRouter.post('/', (request, response) => {
  return response.status(SUCCESS).json({ message: 'cadastro de vendas'});
});

salesRouter.put('/', (request, response) => {
  return response.status(SUCCESS).json({ message: 'atualizar venda'});
});

salesRouter.get('/:id', (request, response) => {
  return response.status(SUCCESS).json({message: 'venda id'});
});

salesRouter.delete('/:id', (request, response) => {
  return response.status(SUCCESS).json({message: 'venda deletado'});
});

module.exports = salesRouter;