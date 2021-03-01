const app = require('express')();
const bodyParser = require('body-parser');
const Service = require('../services/salesService');
const code = require('../utils/statusCode');

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    const itensSold = req.body;
    const resultRegister = await Service.registerManySales(itensSold);

    if (resultRegister.message) throw Error(resultRegister.message);
    res
      .status(code.OK)
      .json(resultRegister);
  } catch (error) {
    console.error(error);
    res
      .status(code.UNPROCESSABLE_ENTITY)
      .json(
        { err: {
          code: 'invalid_data',
          message: error.message
        }}
      );
  }
  

});



module.exports = app;

