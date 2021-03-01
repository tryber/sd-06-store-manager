const sales = require('../models/sales');
const products = require('../models/products');

const nullQuantity = 0;
const idMongoLength = 24;
const quantityErrorMessage = 'Wrong product ID or invalid quantity';

const isInt = (quantity) => {
  if (!Number.isInteger(quantity)) return false;

  return true;
};

const isPositive = (quantity) => {
  if (quantity <= nullQuantity) return false;

  return true;
};

const isRegistered = async (id) => {
  if (id.length === idMongoLength) {
    const checkRegistry = await products.findById(id);
    
    if (checkRegistry) return true;
  }

  return false;
};

const getAll = async () => {
  const salesArray = await sales.getAll();

  return salesArray;
};

const findById = async (id) => {
  const errorObject = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };


  if (id.length !== idMongoLength) return errorObject;

  const sale = await sales.findById(id);

  if (!sale) return errorObject;
  
  return sale;
};

const create = async (sale) => {
  const checkProducts = await Promise.all(sale
    .map((item) => isRegistered(item.productId)));
  const allAreProducts = checkProducts
    .filter((check) => !check).length === nullQuantity;

  const checkQuantityType = await sale.map((item) => isInt(item.quantity));
  const allQuantitiesInt = checkQuantityType
    .filter((check) => !check).length === nullQuantity;

  const checkQuantityPositive = await sale.map((item) => isPositive(item.quantity));
  const allQuantitiesPositive = checkQuantityPositive
    .filter((check) => !check).length === nullQuantity;

  if (!allQuantitiesInt || !allQuantitiesPositive || !allAreProducts) {
    return {
      err: {
        code: 'invalid_data',
        message: quantityErrorMessage,
      },
    };
  }

  const { insertedId } = await sales.create({ itensSold: sale });

  return {
    _id: insertedId,
    itensSold: sale,
  };
};

// const update = async (id, updateSale) => {
//   const { name, quantity } = updateSale;
//   const validOrErrorMessage = isValid(name, quantity);
//   const errorObject = {
//     err: {
//       code: 'invalid_data',
//       message: 'Wrong id format',
//     }
//   };

//   if (validOrErrorMessage !== true) return {
//     err: {
//       code: 'invalid_data',
//       message: validOrErrorMessage,
//     }
//   };

//   const updatedSale = await sales.update(id, name, quantity);

//   if (!updatedSale) return errorObject;

//   return updatedSale;
// };

const deleteSale = async (id) => {
  const errorObject = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  };

  if (id.length !== idMongoLength) return errorObject;

  const deleteSale = await sales.deleteSale(id);
  
  if (!deleteSale) return errorObject;

  return deleteSale;
};

module.exports = {
  getAll,
  findById,
  create,
  // update,
  deleteSale,
};