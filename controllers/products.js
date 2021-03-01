const { Router } = require('express');
const newProductValidate = require('../middlewares/newProductValidate');
const duplicatedProductsValidate = require('../middlewares/duplicatedProductsValid');
const { createNewProduct, Products } = require('../services/products');

const router = Router();

const ERROR = 422;
const SUCESS = 200;
const CREATED = 201;

router.post('/', newProductValidate, duplicatedProductsValidate, async (req, res)=> {
  try {
    const { name, quantity } = req.body;
    const newProd = await createNewProduct({ name, quantity });

    return res.status(CREATED).send(newProd);
  } catch(err) {
    console.log(err);
    res.status(ERROR).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const prod = await Products();

    res.status(SUCESS).send({products: prod});
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
    const product = await Products(id);
    console.log(product);
    if (!product) return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    res.status(SUCESS).send(product);
  } catch(e) {
    console.log(e);
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    
  }
});

module.exports = router;