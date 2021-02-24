const express = require('express');
const vendasRouter = express.Router();

/** abreviação de status */
const cadastrado = 201;
const tudoCerto = 200;
const nunVi = 404;
const deuRuim = 500;

/** rota para cadastro das vendas */
vendasRouter.post('/', async (req, res) => {
  await res.status(cadastrado).json({ message: 'cadastro de vendas' });
});

/** listando todas as vendas */
vendasRouter.get('/', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'listando todas as vendas' });
});

/** listando venda por id */
vendasRouter.get('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'listando uma venda' });
});

/** atualizando venda */
vendasRouter.put('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'atualizando venda' });
});

/** apagando venda */
vendasRouter.delete('/:id', async (req, res) => {
  await res.status(tudoCerto).json({ message: 'apagando venda' });
});

module.exports =vendasRouter;
