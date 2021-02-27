const { Router } = require('express');

const salesService = require('../services/salesService');
const { quantityValidation, idValidation,
  removeIdValidation } = require('../middlewares/salesValidation');

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

router.put('/:id', idValidation, quantityValidation, async (req, res) => {
  const { id } = req.params;

  await salesService.updateSale(id, req.body);

  const editedSale = {
    _id: id,
    itensSold: req.body
  };

  // console.log(`Aqui está o itensSold[0]...${editedSale.itensSold[0].productId}`);

  res.status(OK).json(editedSale);
});

router.delete('/:id', removeIdValidation, async (req, res) => {
  const { id } = req.params;

  const deletedSale = await salesService.findSaleById(id);

  await salesService.removeSale(id);

  res.status(OK).json(deletedSale);
});

module.exports = router;
