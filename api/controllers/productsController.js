const app = require('express')();
const Service  =require('../services/productsService');
const statusCode = require('../utils/magicNumbers');
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
    
    if(!product) throw Error;

    res.status(statusCode.CREATED).json(product);

  } catch (error) {
    console.log(error);
    
  }
});

module.exports = app;
