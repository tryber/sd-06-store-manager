const { Router } = require('express');

const router = Router();

const saleValidate = require('../middlewares/saleValidate');
const { createNewSale, Sales, saleChange } = require('../services/sales');

const ERROR = 422;
const SUCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;

router.post('/', saleValidate, async (req, res) => {
  try {
    const newSale = await createNewSale(req.body);

    return res.status(SUCESS).send({ itensSold: req.body });
  } catch(err) {
    console.log(err);
    res.status(ERROR).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const prod = await Sales();

    return res.status(SUCESS).send({ sales: prod });
  } catch(err) {
    res.status(ERROR).send({ 
      err: 'invalid_data',
      message: 'Something went awry.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await Sales(id);
    if (!sales) return res.status(ERROR).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
    return res.status(SUCESS).send(sales);
  } catch(e) {
    console.log(e);
    return res.status(NOTFOUND).send({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
});

router.put('/:id', saleValidate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleChange(id, req.body);
    return res.status(SUCESS).send({  _id: id, itensSold: req.body });
  } catch (err) {
    console.log(err);
    return res.status(ERROR).send(err);
  }
});


module.exports = router;