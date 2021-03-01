const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceProduct');
const registerProducts = require('../services/validationsProducts/registerProducts');
const verifyObjectId = require('../services/validationsProducts/verifyObjectId');

const success = 200;
const created = 201;
const successNoContent = 204;
const unprocessable = 422;

const router = Router();

router.get('/', rescue(async (req, res) => {
  const product = await service.getAllProducts();

  return res.status(success).json({products:product});
}));

router.get('/:id', verifyObjectId, rescue(async (req, res) => {
  const { id } = req.params;

  const product = await service.getByIdProduct(id);
  return res.status(success).json(product);
}));

router.post('/', registerProducts, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const searcher = await service.getByName({name});
  // console.log(searcher);

  if(!searcher){
    const createdProduct = await service.createProduct({name, quantity});
    return res.status(created).json(createdProduct);
  }
  return res.status(unprocessable).json({ err:{
    code: 'invalid_data', message: 'Product already exists'
  }});

  // console.log(createdProduct.name);
  
  
  // createdProduct.filter(product => product.name !== name);

}));

router.put('/:id',
  registerProducts, rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const update = await service.updateProduct({ id, name, quantity });

    return res.status(success).json({id, name, quantity});
  }));

router.delete('/:id', verifyObjectId, rescue(async (req, res) => {
  const { id } = req.params;
  const {name, quantity } = req.body;
  
  await service.excludeProduct(id);
  return res.status(success).json({name, quantity});
}));

module.exports = router;