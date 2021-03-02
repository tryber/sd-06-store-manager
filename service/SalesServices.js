const Sales = require('../models/Sales');

// No Majik NUMBERS
const NAME_MIN_LENGTH = 5;
const NO_QUANTITY = 0;
const ID_24_HEX = 24;

// No Majik Status NUMBERS:
const UNPROCESSABLE_E =  422;
const NOT_FOUND = 404;

const SUCCESS_CREATED = 201;
const SUCCESS = 200;

// types of code
const codeType = {
  invalid: 'invalid_data',
  notFound:'not_found',
};
// error Messages
const errMsg = {
  notProduct: 'Wrong product ID or invalid quantity',
  notSale:'Sale not found',
  notSaleId: 'Wrong sale ID format',
};

// Plantão do Zambelli 1º de março >>
const creatingValidSale = async(request, response) => {
  const itensSold = request.body;

  const quantityOk = itensSold.every((item) => {
    if ( item.quantity <= NO_QUANTITY || typeof item.quantity !== 'number') {
      return false;
    }
    return true;
  });

  if (!quantityOk) return response.status(UNPROCESSABLE_E)
    .json({ err: {code: codeType.invalid, message: errMsg.notProduct}
    });

  const newSale = await Sales.createSale(itensSold);

  return response.status(SUCCESS).send(newSale);
};

const displayingAllSales = async (_request, response) => {
  const allSalesList = await Sales.getAllSales();
  return response.status(SUCCESS).send({sales: allSalesList});
};

const displayThisSpecificSale = async (request, response) => {
  const { id } = request.params;

  if (id.length !== ID_24_HEX ) return response.status(NOT_FOUND)
    .json({err: { code: codeType.notFound, message: errMsg.notSale }});

  const thisSaleOnly = await Sales.getSaleById(id);
  if(thisSaleOnly === null || thisSaleOnly === {})
    return response.status(NOT_FOUND)
      .json({err: { code: codeType.notFound, message: errMsg.notSale }});

  return response.status(SUCCESS).send(thisSaleOnly);
};

function quantityOk(item) {
  return typeof item.quantity === 'number' && item.quantity > NO_QUANTITY;
};

const updatingValidSale = async (request, response) => {
  const { id } = request.params;
  const itensSold = request.body;

  if (itensSold.every(quantityOk)) {
    await Sales.updateSale(id, itensSold);
    // const updatedSale = await Sales.getSaleById(id);
    return response.status(SUCCESS).json({ _id: id, itensSold });
  }

  return response.status(UNPROCESSABLE_E).json(
    { err: { code: codeType.invalid, message: errMsg.notProduct } }
  );
};

const removingValidSale = async (request, response) => {
  const { id } = request.params;

  if (id.length !== ID_24_HEX ) return response.status(UNPROCESSABLE_E)
    .json({ err: { code: codeType.invalid, message:errMsg.notSaleId }});

  const thisSaleOnly = await Sales.getSaleById(id);
  if(thisSaleOnly === null || thisSaleOnly === {})
    return response.status(UNPROCESSABLE_E)
      .json({ err: { code: codeType.invalid, message:errMsg.notSaleId }});

  await Sales.deleteSale(id);
  return response.status(SUCCESS).send(thisSaleOnly);
};

module.exports = {
  creatingValidSale,
  displayingAllSales,
  displayThisSpecificSale,
  updatingValidSale,
  removingValidSale
};

