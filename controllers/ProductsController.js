const { Router } = require('express');
const { createValidation, getAllValidation, 
  getByIdValidation, updateValidation, removeValidation } 
  = require('../services/ProductsService');

const router = Router();

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const {insert, err, code} = await createValidation(name, quantity);
  if (!insert) res.status(code).json({ err });
  return res.status(code).json(insert);
});

// // Req 2
router.get('/', async (_req, res) => {
  const { code, getAll } = await getAllValidation();
  return res.status(code).json({ products: getAll });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { code, err, item } = await getByIdValidation(id);
  if (!item) res.status(code).json({ err });
  return res.status(code).json(item);
});

// Req 3
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const { err, code, update} = await updateValidation(id, name, quantity);
  
  if (!update) res.status(code).json({err});
  return res.status(code).json(update);
});

// Req 4
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const {err, code, remove} = await removeValidation(id);

  if (!remove) return res.status(code).json({err});
  return res.status(code).json(remove);
});

module.exports = router;
  