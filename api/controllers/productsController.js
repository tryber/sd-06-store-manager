const app = require('express')();
const Service  =require('../services/productsService');
const statusCode = require('../utils/errorCodes');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const products = await Service.productsService();
    
    if (!products) throw Error;
    res.status(statusCode.OK).json(products);
  } catch (error) {
    console.log(error);
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

module.exports = app;
