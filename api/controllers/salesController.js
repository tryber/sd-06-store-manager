const app = require('express')();
const bodyParser = require('body-parser');
const Service = require('../services/salesService');
const statusCode = require('../utils/statusCode');

app.use(bodyParser.json());

app
  .route('/')
  .get(async (_req, res) => {
    try {
      const sales = await Service.findAllSales();
      
      if (!sales) throw Error('out of control');
      res
        .status(statusCode.OK)
        .json({sales});
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.OK)
        .json({message: error.message});
    }
  })
  .post(async (req, res) => {
    try {
      const itensSold = req.body;
      const resultRegister = await Service.registerManySales(itensSold);
  
      if (resultRegister.message) throw Error(resultRegister.message);
      res
        .status(statusCode.OK)
        .json(resultRegister);
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
  
app
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const sales  = await Service.findById(id);
    
      if (sales.message) throw Error(sales.message);
      res
        .status(statusCode.OK)
        .json(sales);
    } catch (error) {
      console.error(error);
      res
        .status(statusCode.NOT_FOUND)
        .json(
          { err: {
            code: 'not_found',
            message: error.message
          }}
        );
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const arraySales = req.body;
      const saleUpdated = await Service.updateSale(id, arraySales);

      if(saleUpdated.message) throw Error(saleUpdated.message);
   
      res
        .status(statusCode.OK)
        .json(saleUpdated);
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
