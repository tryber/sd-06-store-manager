const { Router } = require('express');
const Sales = require('../services/SalesService');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { 
  validateSales,
  validateIdSales, 
  validateIdSalesRemove
} = require('../middlewares');

const router = new Router();
router.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

router.post('/', validateSales, rescue(async (request, response) => {
  const objectSales = request.body;
  const newSale = await Sales.create(objectSales);

  return response.status(SUCCESS).json(newSale);
}),
);

router.get('/', rescue(async (request, response) => {
  const allSales = await Sales.getAll();
  response.status(SUCCESS).json({sales: allSales});
}),
);

router.get('/:id',validateIdSales, rescue(async (request, response) => {
  const { id } = request.params;

  const allSales = await Sales.getById(id);

  if (!allSales) {
    return response.status(NOT_FOUND).json(
      {err: {
        code: 'not_found',
        message: 'Sale not found',
      }}
    );
  }

  response.status(SUCCESS).json(allSales);
}),
);


module.exports = router;
