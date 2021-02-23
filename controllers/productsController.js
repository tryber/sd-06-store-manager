const { Router } = require('express');
const { createProduct, findById, getAll } = require('../services/productsServices');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;
const UNPROCESSABLE = 422;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findById(id);

    if (findProduct === false) return res.status(UNPROCESSABLE).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });

    res.status(SUCCESS).send(findProduct);
  } catch(e) {
    console.log(e);
  }
});

router.get('/', async (_req, res) => {
  try {
    const getProducts = await getAll();

    res.status(SUCCESS).send({ products: getProducts });
  } catch(e) {
    res.status(DFT_ERROR).send({
      err: 'invalid_data',
      message: 'Something went awry.'
    });
  }
});

router.post('/', validateNewProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct({ name, quantity });

    return res.status(CREATED).send(newProduct);
  } catch(e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;
