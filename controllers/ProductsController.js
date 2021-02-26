const { Router } = require('express');
const ProductsService = require('../services/ProductsService');
const {
  createValidationRules,
  validateCreate } = require('../middlewares/validateCreate');
const validateId = require('../middlewares/validateId');

const router = Router();
const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.get('/', async (req, res) => {
  const products = await ProductsService.getAll();

  res.status(OK).json({ products });
});

router.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findById(id);

  if (!product)
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });

  res.status(OK).json(product);
});

router.post('/', createValidationRules(), validateCreate, async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.create(name, quantity);

  if (!newProduct) return res.status(UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  });

  res.status(CREATED).json(newProduct);
});

router.put(
  '/:id',
  validateId,
  createValidationRules(),
  validateCreate,
  async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updated = await ProductsService.update(id, name, quantity);

    if (!updated) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    };

    res.status(OK).json({
      _id: id, name, quantity,
    });
  },
);

router.delete('/:id', validateId, async (req, res) => {
  const { id } = req.params;

  const removed = await ProductsService.remove(id);

  res.status(OK).json(removed);
});

module.exports = router;
