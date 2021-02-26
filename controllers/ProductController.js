const { Router } = require('express');
const rescue = require('express-rescue');
const ProductService = require('../services/ProductService');
const router = Router();

router.get('/', rescue(ProductService.getAll));
router.post('/', 
  rescue(ProductService.validateFields), 
  rescue(ProductService.insertProduct));
router.get('/:id', rescue(ProductService.findById));
router.put('/:id', 
  rescue(ProductService.validateFields), 
  rescue(ProductService.updateProduct));
router.delete('/:id', rescue(ProductService.deleteProduct));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;
