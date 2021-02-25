const { Router } = require('express');
const productService = require('../service/productService');

const routerProduct = new Router(); // instancia (retorna) um obj com as propriedades de Router
const SUCCESS = 200;
const Created = 201;
const UnprocessableEntity = 422;

routerProduct.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  console.log(`product: ${product}`); // nao esta vindo o id 
  if(typeof(product) === 'object'){
    return res.status(SUCCESS).json(product);
  }
  return res.status(UnprocessableEntity).json(
    { err:{
      code: 'invalid_data',
      message: product
    }}
  );
});

routerProduct.get('/', async (req, res) => {
  const products = await productService.getAll();
  res.status(SUCCESS).json({products: products});
});


routerProduct.post('/', async (req, res)=>{
  const { name, quantity } = req.body;
  const { insertedId, invalidProduct } = await 
  productService.createProduct(name, quantity);
  if(insertedId){
    const newProduct = {
      _id: insertedId,
      name,
      quantity
    };
    return res.status(Created).json(newProduct);
  }
 
  return res.status(UnprocessableEntity).json(
    { err:{
      code: 'invalid_data',
      message: invalidProduct
    }}
  );
});

module.exports = routerProduct;

