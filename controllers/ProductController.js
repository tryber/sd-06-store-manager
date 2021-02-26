const { Router } = require('express');
const rescue = require('express-rescue');
const ProductServ = require('../services/ProductService');
const router = Router();

router.get('/', rescue(ProductServ.getAll));
router.post('/', rescue(ProductServ.validateFields), rescue(ProductServ.insertProduct));
router.get('/:id', rescue(ProductServ.findById));
router.put('/:id', rescue(ProductServ.validateFields), rescue(ProductServ.updateProduct));
router.delete('/:id', rescue(ProductServ.deleteProduct));

router.use((err, _req, res, next) => {
  res.status(err.statuscode).json({ err: err.message });
});

module.exports = router;
