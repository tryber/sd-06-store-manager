const { Router } = require('express');
const productService = require('../service/productService');

const routerProduct = new Router(); // instancia (retorna) um obj com as propriedades de Router
const SUCCESS = 200;
const Created = 201;
const UnprocessableEntity = 422;

routerProduct.get('/', async (_req, res) => {
  
  const products = await productService.getAll();
  console.log({products});
  res.status(SUCCESS).json(products);

});

routerProduct.post('/', async (req, res)=>{
  const { name, quantity } = req.body;
  const { insertedId, inValidProduct } = await 
  productService.createProduct(name, quantity);
  if(insertedId){
    const newProduct = {
      id: insertedId,
      name,
      quantity
    };
    return res.status(Created).json(newProduct);
  }
 
  return res.status(UnprocessableEntity).json(
    { err:{
      code: 'invalid_data',
      message: inValidProduct
    }}
  );
});

module.exports = routerProduct;

