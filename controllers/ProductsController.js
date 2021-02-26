const { Router } = require('express');
const {
  validateName,
  validateProduct,
  validateId
} = require('../middlewares/ProductsMid');
const {
  createProductService,
  getAllProductsService,
  getByIdService,
  attProductService,
  deleteProductService,
} = require('../service/ProductsService');

const router = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE = 422;
const twentyFour = 24;

router.post('/', validateProduct, validateName, async (req, res) => {
  const { name, quantity } = req.body;
  const productCreated = await createProductService(name, quantity);
  return res.status(CREATED).json(productCreated);
});

router.get('/', async (req, res) => {
  const getAll = await getAllProductsService();
  return res.status(SUCCESS).json({ products: getAll });
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const product = await getByIdService(id);
  return res.status(SUCCESS).json(product);
});

router.put('/:id', validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productAtt = await attProductService(id, name, quantity);
  return res.status(SUCCESS).json(productAtt);
});

router.delete('/:id', async(req, res) =>  {
  const { id } = req.params;
  const deleted = await deleteProductService(id);

  if(!deleted || id.length < twentyFour) return res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }});

  return res.status(SUCCESS).json(deleted);
});

module.exports = router;
