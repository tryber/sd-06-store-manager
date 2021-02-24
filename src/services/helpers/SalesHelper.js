const { ObjectId } = require('mongodb');
const Sales = require('../../models/Sales');

const quantityValidation = (salesArr) => {
  const errorString = 'error';

  const validation = salesArr.map(sale => {
    if (sale.quantity < 1) return errorString;
    if (!Number.isInteger(sale.quantity)) return errorString;
  });

  if (validation.includes(errorString)) return (
    {
      payload: { 
        err: {
          message: 'Wrong product ID or invalid quantity', 
          code: 'invalid_data',
        },
      },
      error: { status: 422 },
    }
  );

  return false;
};

const idValidation = async (id) => {
  if (!ObjectId.isValid(id)) return (
    {
      payload: {
        err: {
          message: 'Sale not found', 
          code: 'not_found',
        },
      },
      error: { status: 404 }
    }
  );

  const searchResult = await Sales.getById(id);
  if (!searchResult) return (
    {
      payload: {
        err: {
          message: 'Sale not found', 
          code: 'not_found',
        },
      },
      error: { status: 404 }
    }
  );

  return searchResult;
};


module.exports = {
  quantityValidation,
  idValidation,
};
