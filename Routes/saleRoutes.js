const controller = require('../Controllers/saleControllers');
const saleValidate = require('../Utils/Sales/saleValidation');
const idValidation = require('../Utils/Sales/saleIdValidation');
const { Router } = require('express');

const SUCCESS = 200;

const router = new Router();

router.post('/', saleValidate, async (req, res) => {
  const sale = req.body;

  const createdSale = await controller.create(sale);

  return res.status(SUCCESS).json(createdSale);
});

router.get('/', async (_req, res) => {
  const salesList = await controller.getAll();

  return res.status(SUCCESS).send({sales: salesList});
});

router.get('/:id', idValidation, async (req, res) => {
  const { id } = req.params;

  const sale = await controller.findById(id);

  return res.status(SUCCESS).send(sale);
});

router.put('/:id', idValidation, saleValidate, async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const updatedSale = await controller.updateById(id, itensSold);

  return res.status(SUCCESS).send(updatedSale);
});

module.exports = router;
