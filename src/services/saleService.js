const sales = require('../models/saleModel');

// No Magic Numbers and Status Numbers
const NULL_QUANTITY = 0;
const ID_MONGO_LENGTH = 24;

const UNPROCESSABLE_ENITY = 422;
const SUCCESS = 200;
const NOT_FOUND = 404;

const codeInvalidData = 'invalid_data';
const codeNotFound = 'not_found';

// Error Messages
const errorMessages = {
  invalidProduct: 'Wrong product ID or invalid quantity',
  notFoundSale:'Sale not found',
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
    .json({ err: {code: codeInvalidData, message: errorMessages.invalidProduct}
    });

  const newSale = await sales.createSaleModels(itensSold);

  return res.status(SUCCESS).send(newSale);
};

const getAllSalesService = async (_req, resp) => {
  const allSales = await sales.getAllSalesModels();

  return resp.status(SUCCESS).send({ sales: allSales });
};

const getSaleByIdService = async (req, res) => {
  const { id } = req.params;

  if (id.length !== ID_MONGO_LENGTH) return res.status(NOT_FOUND)
    .json({err: { code: codeNotFound, message: errorMessages.notFoundSale }});

  const thisSaleOnly = await sales.getSaleByIdModels(id);
  if(thisSaleOnly === null || thisSaleOnly === {})
    return response.status(NOT_FOUND)
      .json({err: { code: codeNotFound, message: errorMessages.notFoundSale }});

  return response.status(SUCCESS).send(thisSaleOnly);
};

module.exports = {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
};
