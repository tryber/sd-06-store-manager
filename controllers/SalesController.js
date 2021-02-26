const { Router } = require('express');
const Sales = require('../models/Sales');

const router = Router();

const SUCCESS = 200;
const Erro422 = 422;
const Zero = 0;


router.get('/', async (_req, res) => {
  const sales = await Sales.getAll();

  res.status(SUCCESS).json({sales});
});

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
  const sales = req.body;
  // forEach não respeita a ordem async/await e Promise.all só funciona se a ordem de execução não for importante.
  for (const product of sales) {
    const err = await validationSales(product.quantity);
    if (err) return res.status(Erro422).json({ err });  
  } // O for..of executa o loop na ordem esperada, aguardando que cada operação await anterior seja concluída antes de passar para a próxima.
  
  const { insertedId } = await Sales.create(sales);
  const salesInserted = {
    _id: insertedId,
    itensSold: sales
  };
  
  return res.status(SUCCESS).json(salesInserted);
});

module.exports = router;