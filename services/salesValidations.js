const productsModel = require('../models/productsModel');

const collectionProducts = 'products';
const collectionSales = 'sales';

const objError = (message, status) => ({ message, status });
const itIsString = (parameter) => typeof parameter === 'string';
const itIsEqual = (parameter1, parameter2) => parameter1 === parameter2;
const itIsLessThan = (parameter1, parameter2) => parameter1 < parameter2;

const validationSalesQuantity = (sale) => {
  const { quantity } = sale;
  const typeError = 422;
  const zero = 0;

  switch (true) {
  case itIsEqual(quantity, zero):
  case itIsLessThan(quantity, zero):
  case itIsString(quantity):
    return objError('Wrong product ID or invalid quantity', typeError);
  default: return null;
  }  
};

const validationSalesProductId = async (sale) => {
  const { productId } = sale;
  const typeError422 = 422;
  
  try {
    const product = await productsModel.findById(collectionProducts, productId);
    if (!product) {
      return objError('Wrong product ID or invalid quantity', typeError422);
    }
  } catch {
    return objError('Wrong product ID or invalid quantity', typeError422);
  }  
  return null;
};

const validationSalesRouterIdAndSaveSale = async (id, res) => {
  const typeError = 404;
  
  try {
    const sale = await productsModel.findById(collectionSales, id);
    if (!sale) {
      return objError('Sale not found', typeError);
    }
    res.locals.sale = sale;
  } catch {
    return objError('Sale not found', typeError);
  }  
  return null;
};

const validationSalesRouterIdAndSaveSaleDelete = async (id, res) => {
  const typeError = 422;
  
  try {
    const sale = await productsModel.findById(collectionSales, id);
    if (!sale) {
      return objError('Wrong sale ID format', typeError);
    }
    await productsModel.deleteForId(collectionSales, id);
    res.locals.sale = sale;
  } catch {
    return objError('Wrong sale ID format', typeError);
  }  
  return null;
};

// const validationSalesRouterIdAndSaveSaleUpdate = async (id, res, body) => {
//   const typeError = 422;
  
//   try {
//     await productsModel.updateForId(collectionSales, id, body);
//     const sale = await productsModel.findById(collectionSales, id);
//     if (!sale) {
//       return objError('Wrong product ID or invalid quantity', typeError);
//     }
//     res.locals.sale = sale;
//   } catch {
//     return objError('Wrong product ID or invalid quantity', typeError);
//   }  
//   return null;
// };

module.exports = {
  validationSalesQuantity,
  validationSalesProductId,
  validationSalesRouterIdAndSaveSale,
  validationSalesRouterIdAndSaveSaleDelete
};
