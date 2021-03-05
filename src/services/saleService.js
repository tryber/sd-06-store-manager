const sales = require('../models/saleModel');

// No Magic Numbers and Status Numbers
const NULL_QUANTITY = 0;

const UNPROCESSABLE_ENITY = 422;
const SUCCESS = 200;

const code = 'invalid_data';

// Error Messages
const errorMessages = {
  invalidProduct: 'Wrong product ID or invalid quantity',
};

// Criação vendas
const createSaleService = async(req, res) => {
  const itensSold = req.body;

  const quantityVerify = itensSold.every((item) => {
    if ( item.quantity <= NULL_QUANTITY || typeof item.quantity !== 'number') {
      return false;
    }
    return true;
  });

  if (!quantityVerify) return res.status(UNPROCESSABLE_ENITY)
    .json({ err: {code: code, message: errorMessages.invalidProduct}
    });

  const newSale = await sales.createSaleModels(itensSold);

  return res.status(SUCCESS).send(newSale);
};

module.exports = {
  createSaleService,
};
