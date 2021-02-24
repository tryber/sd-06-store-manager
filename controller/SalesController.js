const { Router } = require('express');
const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const SalesService = require('../service/SalesService');

const router = Router();

const quatrocentosEVinteEDois = 422;
const duzentos = 200;
const quatrocentosEQuatro = 404;
const wrongProductId = 'Wrong product ID or invalid quantity';

router.post('/sales', rescue (async(req, res) => {
  const itens = req.body;

  if(itens.some((item) => SalesService.checkQuantityLessThanZero(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  if(itens.some((item) => SalesService.checkQuantityEqualZero(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  if(itens.some((item) => SalesService.checkQuantityString(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  const created = await SalesService.createSale(itens);

  return res.status(duzentos).json(created);
}));

router.get('/sales', rescue (async(req, res) => {
  const allSales = await SalesService.findAllSales();
  return res.status(duzentos).json({sales: allSales});
}));

router.get('/sales/:id', rescue (async(req, res) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    return res.status(quatrocentosEQuatro).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }

  const sale = await SalesService.findSaleById(id);

  if(!sale) {
    return res.status(quatrocentosEQuatro).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }

  return res.status(duzentos).json(sale);
}));

router.put('/sales/:id', rescue (async(req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  if(itensSold.some((item) => SalesService.checkQuantityLessThanZero(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  if(itensSold.some((item) => SalesService.checkQuantityEqualZero(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  if(itensSold.some((item) => SalesService.checkQuantityString(item.quantity))) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: wrongProductId
      }
    });
  }

  await SalesService.updateSale(id, itensSold);

  const sale = await SalesService.findSaleById(id);

  return res.status(duzentos).json(sale);
}));

router.delete('/sales/:id', rescue (async(req, res) => {
  const { id } = req.params;

  if(!ObjectId.isValid(id)) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }

  const sale = await SalesService.findSaleById(id);

  if(!sale) {
    return res.status(quatrocentosEVinteEDois).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }

  await SalesService.deleteSale(id);

  return res.status(duzentos).json(sale);
}));

module.exports = router;
