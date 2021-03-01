const { Router } = require('express');
const {
  registerSale,
} = require('../models/Sales');
const { validateInsertData } = require('../services/SalesServices');

const SalesRouter = new Router();
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;
const EMPTY = 0;
const FIRST_INDEX_TO_ITERATE = 0;
const ITERATION_VALUE = 1;

SalesRouter.post('/', async (req, res) => {
  const itensSold = req.body;

  if (itensSold.length === EMPTY) {
    return res.status(UNPROCESSABLE_ENTITY).json({ message: 'no sales to register'});
  } else {
    let foundAnError = false;

    for (let i = FIRST_INDEX_TO_ITERATE; i < itensSold.length; i += ITERATION_VALUE) {
      const { productId, quantity } = itensSold[i];
      const validationResult = await validateInsertData(productId, quantity);
      console.log(validationResult);
      if (validationResult !== 'is valid') {
        foundAnError = true;
        return res.status(UNPROCESSABLE_ENTITY).json(validationResult);
      }
    }
    const registerResponse = await registerSale(itensSold);
    
    return res.status(SUCCESS).json(registerResponse);
  }
});

module.exports = SalesRouter;
