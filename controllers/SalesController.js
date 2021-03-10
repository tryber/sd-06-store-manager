const { Router } = require('express');
const { createValidation, getAllValidation, 
  getByIdValidation, updateValidation, removeValidation, setValidation, stockValidation } 
  = require('../services/SalesService');
const router = Router();

const INTERNAL_ERROR = 500;

router.post('/', setValidation, async (req, res) => {
  try {
    const itensSold = req.body;
    const {err, code, newSale} = await createValidation(itensSold);
    if (!newSale) return res.status(code).json({ err });
    return res.status(code).json(newSale); 
  } catch (e) {
    return res.status(INTERNAL_ERROR).json({message: e.message});
  }
});

// Req 6
router.get('/', async (_req, res) => {
  const {code, sales } = await getAllValidation();

  return res.status(code).json({sales: sales});
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const {err, code, sale} = await getByIdValidation(id);
  
  if (!sale) return res.status(code).json({ err });
  return res.status(code).json(sale);
});

// Req 7
router.put('/:id', async (req, res) => {
  const updated = req.body;
  const { id } = req.params;

  const { err, code, updateSale} = await updateValidation(id, updated);
  
  if (!updateSale) res.status(code).json({err});
  return res.status(code).json(updateSale);
});

// Req 8
router.delete('/:id', stockValidation, async (req, res) => {
  const { id } = req.params;
  const {err, code, delSale} = await removeValidation(id);

  if (!delSale) return res.status(code).json({err});
  return res.status(code).json(delSale);
});

module.exports = router;
