const { Router } = require('express');

const salesService = require('../services/salesService');
const { quantityValidation, idValidation } = require('../middlewares/salesValidation');

const router = Router();

const OK = 200;
// const CREATED = 201;

router.get('/', async (_req, res) => {
  const sales = await salesService.getAllSales();

  res.status(OK).json({ sales });
});

router.get('/:id', idValidation, async (req, res) => {
  const { id } = req.params;

  const saleById = await salesService.findSaleById(id);

  res.status(OK).json(saleById);
});

router.post('/', quantityValidation, async (req, res) => {
  const sale = req.body;

  const newSale = await salesService.createNewSale(sale);

  res.status(OK).json(newSale);
});

// router.put('/:id', idValidation, nameAndQuantityValidation, async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   await salesService.updateSale(id, name, quantity);

//   const product = {
//     _id: id,
//     name,
//     quantity
//   };

//   res.status(OK).json(product);
// });

// router.delete('/:id', idValidation, async (req, res) => {
//   const { id } = req.params;

//   const deletedSale = await salesService.findSaleById(id);

//   await salesService.removeSale(id);

//   res.status(OK).json(deletedSale);
// });

module.exports = router;
