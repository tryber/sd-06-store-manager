const services = require('../Services/saleServices');
const saleValidate = require('../Utils/Sales/saleValidation');
const { Router } = require('express');

const SUCCESS = 200;

const router = new Router();

router.post('/', saleValidate, async (req, res) => {
  const sale = req.body;

  const createdSale = await services.create(sale);

  return res.status(SUCCESS).send(createdSale);
});

module.exports = router;
