const Products = require('../../models/Products');

const nameValidation = async (name, minChar) => {
  const checkDb = await Products.findItem(name);
  if (checkDb[0] && checkDb[0].name === name) return (
    {
      payload: { 
        err: {
          message: 'Product Already Exists', 
          code: 'invalid_data',
        }
      },
      error: { status: 422 }
    }
  );

  if (name.length < minChar) return (
    {
      err: {
        message: 'name length must be at least 5 characters long', 
        code: 'invalid_data',
      },
    }
  );

  return false;
};

const quantityValidation = (qnt) => {
  if (!Number.isInteger(qnt)) return (
    {
      payload: { 
        err: {
          message: 'quantity must be a number', 
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
          message: 'quantity must be larger than or equal to 1', 
          code: 'invalid_data',
        },
      },
      error: { status: 422 }
    }
  );

  return false;
};

module.exports = {
  nameValidation,
  quantityValidation,
};
