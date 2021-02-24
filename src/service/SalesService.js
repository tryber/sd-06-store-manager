const { ObjectId } = require('mongodb');
const Sales = require('../model/Sales');

// Return all Products
const getAll = async () => {
  return await Sales.getAll();
};

// // Return Product by ID
// const findById = async (id) => {
//   // console.log('id', id);
//   // console.log(validateId(id));
//   if (validateId(id)) {
//     const product = await Product.findById(id);
//     if (product) return { status: 'OK', product};
//   }
//   return { status: 'NOK', message: 'Wrong id format' };
// };

// Add new Product
const create = async (itensSold) => {
  if (validateSale(itensSold)) {
    const result = await Sales.create(itensSold);
    return { status: 'OK', result };
  }
  return { status: 'NOK', result: 'Wrong product ID or invalid quantity' };
};

// // Update Product
// const update = async (id, name, quantity) => {
//   const validationMessage = await validateProduct('update', name, quantity);
//   if (validationMessage === 'OK' && validateId(id)) {
//     const product = await Product.update(id, name, quantity);
//     return { status: 'OK', product };
//   } 
//   return { status: 'NOK', message: validationMessage };
// };

// // Remove Product
// const remove = async (id) => {
//   const product = await Product.findById(id);
//   if (product) {
//     Product.remove(id);
//     return { status: 'OK', product};
//   }
//   return { status: 'NOK', message: 'Wrong id format' };
// };


// // Get Product By Name
// const getByname = async (name) => {
//   return await Product.findByName(name);
// };

// // Check Exist Product, search by name
// const existProductName = async (name) => {
//   const product = await getByname(name);
//   return product;
// };

// // Validation Id
// const validateId = (id) => {
//   const lengthId = 24;
//   return (id.length === lengthId && id !== undefined);
// };

// Validation Sale fields
const validateSale = (itensSold) => {
  const ZERO = 0;
  let resultOk = true;
  itensSold.forEach(item => {
    if (!item.quantity || item.quantity < ZERO 
      || item.quantity === ZERO || !Number.isInteger(item.quantity)) {
      resultOk = false;
    };
  });
  return resultOk;
};

module.exports = {
  getAll,
  // findById,
  create,
  // update,
  // remove,
};
