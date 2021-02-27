const controller = require('../Controllers/saleControllers');
const saleValidate = require('../Utils/Sales/saleValidation');
const idValidation = require('../Utils/Sales/saleIdValidation');
const saleExistence = require('../Utils/Sales/saleExistence');
const { Router } = require('express');

const SUCCESS = 200;
const NOTFOUND = 404;

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

  if(!sale) {
    const err = {
      code: 'not_found',
      message: 'Sale not found'
    };

    return res.status(NOTFOUND).send({ err: err });
  }

  return res.status(SUCCESS).send(sale);
});

router.put('/:id', idValidation, saleValidate, async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const updatedSale = await controller.updateById(id, itensSold);

  return res.status(SUCCESS).send(updatedSale);
});

router.delete('/:id',saleExistence ,async (req, res) => {
  const { id } = req.params;

  const deletedSale = await controller.deleteById(id);

  return res.status(SUCCESS).send(deletedSale);
});

module.exports = router;
