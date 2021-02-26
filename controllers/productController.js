const { Router } = require('express');
const productService = require('../service/productService');

const routerProduct = new Router(); // instancia (retorna) um obj com as propriedades de Router
const SUCCESS = 200;
const Created = 201;

routerProduct.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (product.isError) {
    return res.status(product.status).json({
      err: {
        code: 'invalid_data',
        message: product.message,
      },
    });
  }
  return res.status(SUCCESS).json(product);
});

routerProduct.get('/', async (req, res) => {
  const products = await productService.getAll();
  res.status(SUCCESS).json({ products: products });
});

routerProduct.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const editedProduct = await productService.editProductById(id, name, quantity);
  if (editedProduct.isError) {
    return res.status(editedProduct.status).json({
      err: {
        code: 'invalid_data',
        message: editedProduct.message,
      },
    });
  }
  return res.status(SUCCESS).json(editedProduct);
});

routerProduct.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const insertedId = await productService.createProduct(name, quantity);
  // console.log(`error: ${error}`);
  if (insertedId.isError) {
    return res.status(insertedId.status).json({
      err: {
        code: 'invalid_data',
        message: insertedId.message,
      },
    });
  }
  const newProduct = {
    _id: insertedId.insertedId,
    name,
    quantity,
  };
  return res.status(Created).json(newProduct);
});

routerProduct.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  if(deletedProduct.isError){
    return res.status(deletedProduct.status).json(
      {
        err: {
          code: 'invalid_data',
          message: deletedProduct.message,
        },
      }
    );
  }
  return res.status(SUCCESS).json(deletedProduct);
});

module.exports = routerProduct;
