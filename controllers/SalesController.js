const { Router } = require('express');
const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');
const router = Router();

router.get('/', rescue(SalesService.getAll));
router.post('/', rescue(SalesService.validateFields), rescue(SalesService.insertSale));
router.get('/:id', rescue(SalesService.findById));
router.put('/:id', rescue(SalesService.validateFields), rescue(SalesService.updateSale));
router.delete('/:id', rescue(SalesService.deleteSale));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;