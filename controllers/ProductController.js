const { Router } = require('express');
const ProductService = require('../services/ProductService');
const router = Router();

const CREATED = 201;

router.post('/', async (req, res) => {
  const validate = await ProductService.validateFields(req.body);
  if (!validate.status) return res.status(validate.httpcode).json({ 
    err: { 
      code: validate.code, 
      message: validate.msg
    } });

  const newProduct = await ProductService.insertProduct(req.body);
  
  return res.status(CREATED).json({...newProduct});
});



module.exports = router;