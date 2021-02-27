const { Router } = require('express');
const { ObjectId, Logger } = require('mongodb');
const Sales = require('../models/Sales');

const router = Router();

const SUCCESS = 200;
const Erro422 = 422;
const Erro404 = 404;
const Zero = 0;


router.get('/', async (_req, res) => {
  const sales = await Sales.getAll();

  res.status(SUCCESS).json({sales});
});

// 5
const validationSales = async (quantity) => {
  // Será validado que não é possível cadastrar vendas com quantidade menor ou iqual a zero
  if (quantity <= Zero) {
    return {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    };
  }
  // Será validado que não é possível cadastrar vendas com uma string no campo quantidade
  if (isNaN(quantity)) {
    return {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    };
  }

  return null;
};

router.post('/', async (req, res) => {
  const itensSold = req.body;
  // forEach não respeita a ordem async/await e Promise.all só funciona se a ordem de execução não for importante.
  for (const product of itensSold) {
    const err = await validationSales(product.quantity);
    if (err) return res.status(Erro422).json({ err });  
  } // O for..of executa o loop na ordem esperada, aguardando que cada operação await anterior seja concluída antes de passar para a próxima.
  
  const { insertedId } = await Sales.create(itensSold);
  const salesInserted = {
    _id: insertedId,
    itensSold
  };
  
  return res.status(SUCCESS).json(salesInserted);
});
// 5

// 6
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) {
    return res.status(Erro404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
  const saleId = await Sales.getById(id);
  if(!saleId) {
    return res.status(Erro404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
  return res.status(SUCCESS).json(saleId);
});
// 6

// 7
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  // forEach não respeita a ordem async/await e Promise.all só funciona se a ordem de execução não for importante.
  for (const product of itensSold) {
    const err = await validationSales(product.quantity);
    if (err) return res.status(Erro422).json({ err });  
  } // O for..of executa o loop na ordem esperada, aguardando que cada operação await anterior seja concluída antes de passar para a próxima.
  
  const sale = await Sales.update(id, itensSold);
  return res.status(SUCCESS).json(sale.value);
});
// 7

// 8
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if(!ObjectId.isValid(id)) {
    return res.status(Erro422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  const sale = await Sales.remove(id);
  return res.status(SUCCESS).json(sale.value);
});
// 8

module.exports = router;