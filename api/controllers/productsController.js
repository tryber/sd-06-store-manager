const app = require('express')();
const Service  =require('../services/productsService');
const statusCode = require('../utils/statusCode');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', async (_req, res) => {
  try {
    const products = await Service.getAllProducts();
    if (!products) throw Error('No sales found');
    res
      .status(statusCode.OK)
      .json({products});

  } catch (error) {
    console.log(error);
    res
      .status(statusCode.OK)
      .json({message: error.message});
  }
});


app.get('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Service.findProductById(id);
    
    if (product.message) throw new Error(product.message);

    res.status(statusCode.OK).json(product);

  } catch (error) {
    console.error(error.message);
    res
      .status(statusCode.UNPROCESSABLE_ENTITY)
      .json(
        { err: {
          code: 'invalid_data',
          message: error.message
        }}
      );
  }
});

app.post('/', async (req, res) => {
  try {
    const {name, quantity} = req.body;
    const product = await Service.registerProduct(name, quantity);
   
    if(product.message) throw new Error(product.message);

    res.status(statusCode.CREATED).json(product);

  } catch (error) {
    console.error(error);
    res
      .status(statusCode.UNPROCESSABLE_ENTITY)
      .json(
        { err: {
          code: 'invalid_data',
          message: error.message
        }}
      );
  }
});

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const productUpdated = await Service.updateProduct(id, name, quantity);
    
    if (productUpdated.message) throw new Error(productUpdated.message);

    res
      .status(statusCode.OK)
      .json(productUpdated);

      

  } catch (error) {
    console.error(error);
    res
      .status(statusCode.UNPROCESSABLE_ENTITY)
      .json(
        { err: {
          code: 'invalid_data',
          message: error.message
        }}
      );
  }  
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultOfDelete = await Service.deleteProduct(id);
    
    if (resultOfDelete.message) throw new Error(resultOfDelete.message);

    res.send(resultOfDelete);

  } catch (error) {
    console.error(error);
    res
      .status(statusCode.UNPROCESSABLE_ENTITY)
      .json(
        { err: {
          code: 'invalid_data',
          message: error.message
        }}
      );
  }
});

module.exports = app;
