const { ObjectId } = require('mongodb');
const Products = require('../../models/Products');

const nameValidation = async (name, minChar, update=false) => {
  if (name.length < minChar) return (
    {
      payload: {
        err: {
          message: '"name" length must be at least 5 characters long', 
          code: 'invalid_data',
        }
      },
      error: { status: 422 }
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
      error: { status: 422 }
    }
  );
  return false;
};

const quantityValidation = (qnt) => {
  if (!Number.isInteger(qnt)) return (
    {
      payload: { 
        err: {
          message: '"quantity" must be a number', 
          code: 'invalid_data',
        },
      },
      error: { status: 422 }
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
      error: { status: 422 }
    }
  );

  return false;
};

const idValidation = async (id) => {
  if (!ObjectId.isValid(id)) return (
    {
      payload: {
        err: {
          message: 'Wrong id format', 
          code: 'invalid_data',
        },
      },
      error: { status: 422 }
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
      error: { status: 422 }
    }
  );

  return searchResult;
};

module.exports = {
  nameValidation,
  quantityValidation,
  idValidation,
};
