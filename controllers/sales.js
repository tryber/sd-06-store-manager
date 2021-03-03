const { Router } = require('express');
const { ObjectId } = require('mongodb');

const router = Router();

const saleValidate = require('../middlewares/saleValidate');
const { createNewSale, Sales, saleChange, saleDelete } = require('../services/sales');

const ERROR = 422;
const SUCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;

router.post('/', saleValidate, async (req, res) => {
  try {
    const newSale = await createNewSale(req.body);
    const insID = newSale.insertedId;

    return res.status(SUCESS).send({ _id: insID, itensSold: req.body });
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const valid = ObjectId.isValid(id);
  console.log(valid);
  try {
    

    const result = await saleDelete(id);
    return res.status(SUCESS).send(result);
  } catch (err) {
    console.log(err);
    return res.status(ERROR).send({ 
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
});


module.exports = router;