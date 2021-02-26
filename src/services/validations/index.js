const { ObjectId } = require('mongodb');
const Sales = require('../../models/Sales');
const Products = require('../../models/Products');
const INVALID_DATA = 422;
const NOT_FOUND = 404;

const nameValidation = async (name, minChar, update=false) => {
  if (name.length < minChar) return (
    {
      payload: {
        err: {
          message: '"name" length must be at least 5 characters long', 
          code: 'invalid_data',
        }
      },
      error: { status: INVALID_DATA }
    }
  );
  
  const checkDb = await Products.findByName(name);
  if (checkDb[0] && checkDb[0].name === name && !update) return (
    {
      payload: { 
        err: {
          message: 'Product already exists', 
          code: 'invalid_data',
        }
      },
      error: { status: INVALID_DATA }
    }
  );
  return false;
};

const quantityValidation = (salesArr, qnt=false) => {
  if (salesArr){ 
    const isError = salesArr.find(sale => {
      if (sale.quantity < 1 || !Number.isInteger(sale.quantity)) return sale;
    });

    if (isError) return (
      {
        payload: { 
          err: {
            message: 'Wrong product ID or invalid quantity', 
            code: 'invalid_data',
          },
        },
        error: { status: INVALID_DATA },
      }
    );
  }

  if (!salesArr) {
    if (!Number.isInteger(qnt)) return (
      {
        payload: { 
          err: {
            message: '"quantity" must be a number', 
            code: 'invalid_data',
          },
        },
        error: { status: INVALID_DATA }
      }
    );
  
    if (qnt < 1) return (
      {
        payload: {
          err: {
            message: '"quantity" must be larger than or equal to 1', 
            code: 'invalid_data',
          },
        },
        error: { status: INVALID_DATA }
      }
    );
  }

  return false;
};

const idValidation = async (id, sale=false, del=false) => {
  if (sale) {
    if (!ObjectId.isValid(id) && !del) return (
      {
        payload: {
          err: {
            message: 'Sale not found', 
            code: 'not_found',
          },
        },
        error: { status: NOT_FOUND }
      }
    );

    if (!ObjectId.isValid(id) && del) return (
      {
        payload: {
          err: {
            message: 'Wrong sale ID format', 
            code: 'invalid_data',
          },
        },
        error: { status: INVALID_DATA }
      }
    );

    const searchResult = await Sales.getById(id);
    if (!searchResult && !del) return (
      {
        payload: {
          err: {
            message: 'Sale not found', 
            code: 'not_found',
          },
        },
        error: { status: NOT_FOUND }
      }
    );

    if (!searchResult && del) return (
      {
        payload: {
          err: {
            message: 'Wrong sale ID format', 
            code: 'invalid_data',
          },
        },
        error: { status: INVALID_DATA }
      }
    );

    return searchResult;
  }

  if (!ObjectId.isValid(id)) return (
    {
      payload: {
        err: {
          message: 'Wrong id format', 
          code: 'invalid_data',
        },
      },
      error: { status: INVALID_DATA }
    }
  );

  const searchResult = await Products.findById(id);
  if (!searchResult) return (
    {
      payload: {
        err: {
          message: 'Wrong id format', 
          code: 'invalid_data',
        },
      },
      error: { status: INVALID_DATA }
    }
  );

  return searchResult;
};


module.exports = {
  quantityValidation,
  idValidation,
  nameValidation
};