const { Router } = require('express');
const Sales = require('../services/SalesService');

const router = new Router();
const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router
  .post('/', async (req, res) => {
    const itensSold = req.body;

    const sale = await Sales.create(itensSold);

    if (sale.message) return res.status(UNPROCESSABLE_ENTITY).json(
      { err: {
        code: 'invalid_data',
        message: sale.message
      }}
    );

    res.status(SUCCESS).json(sale);
  })
  .get('/', async (req, res) => {
    const sales = await Sales.getAll();

    res.status(SUCCESS).json({ sales });
  });
// .get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const sale = await Sales.findById(id);

//   if (sale.message) return res.status(UNPROCESSABLE_ENTITY).json({
//     err: {
//       code: 'invalid_data',
//       message: sale.message
//     }
//   });

//   res.status(SUCESS).json(sale);
// })
// .put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const updatedSale = await Sales.update(id, name, quantity);

//   if (updatedSale.message) return res.status(UNPROCESSABLE_ENTITY).json(
//     { err: {
//       code: 'invalid_data',
//       message: updatedSale.message
//     }}
//   );

//   res.status(SUCESS).json(updatedsale);
// })
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