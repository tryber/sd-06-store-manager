const { Router } = require('express');
const Sales = require('../services/SalesService');

const router = new Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

router
  .post('/', async (req, res) => {
    const itensSold = req.body;

    const sale = await Sales.create(itensSold);

    if (!sale) return res.status(UNPROCESSABLE_ENTITY).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }}
    );

    res.status(SUCCESS).json(sale);
  })
  .get('/', async (req, res) => {
    const sales = await Sales.getAll();

    res.status(SUCCESS).json({ sales });
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.findById(id);

    if (!sale) return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });

    res.status(SUCCESS).json(sale);
  })
  .put('/:id', async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;

    const updatedSale = await Sales.update(id, itensSold);

    if (!updatedSale) return res.status(UNPROCESSABLE_ENTITY).json(
      { err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }}
    );

    res.status(SUCCESS).json(updatedSale);
  });
// .delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const deletedSale = await Sales.remove(id);

//   if (deletedSale.message) return res.status(UNPROCESSABLE_ENTITY).json({
//     err: {
//       code: 'invalid_data',
//       message: deletedSale.message
//     }
//   });

//   res.status(SUCESS).json(deletedSale);
// });


module.exports = router;