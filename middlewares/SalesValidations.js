const { request } = require('express');
const connection = require('../models/connection');
const { getAllProducts } = require('../models/Products');
const Sales = require('../models/Sales');
const Products = require('../models/Products');
const { ObjectId } = require('mongodb');

const error = 422;
const errorNotFound = 404;
const ZERO = 0;
const UM = 1;
const TWEENTYFOUR = 24;
// const SIXTEEN = 16;

const messageError = (code, message) => {
  return {
    err: {
      code,
      message,
    }
  };
};

const validateQuantity = (request, response, next) => {
  const sales = request.body;

  const wrongQuantities = sales
    .filter((sale) => (sale.quantity <= ZERO) || (typeof sale.quantity !== 'number'));

  if (wrongQuantities.length >= UM) return response
    .status(error)
    .json(messageError('invalid_data', 'Wrong product ID or invalid quantity'));

  next();
};

const saleExists = async (request, response, next) => {
  const { id } = request.params;

  if ((id.length !== TWEENTYFOUR)
    || (id.length === TWEENTYFOUR && await Sales.findById(id) === null)) return response
    .status(errorNotFound).json(messageError('not_found', 'Sale not found'));

  next();
};

const idFormat = async (request, response, next) => {
  const { id } = request.params;

  if (id.length !== TWEENTYFOUR) return response
    .status(error).json(messageError('invalid_data', 'Wrong sale ID format'));

  next();
};

const isQuantityInStock = async (request, response, next) => {
  const saleInOrder = request.body;
  // const productsDB = await Products.getAllProducts();

  const positive = saleInOrder
    .filter(async (sale) => await Products
      .findById(sale.productId).quantity < sale.quantity
    // const id = sale.productId;
    // const achei = await Products.findById(id);
    // console.log(achei);
    // console.log(`sale: ${sale.quantity}`);
    // console.log(`banco: ${achei.quantity}`);
    // return achei.quantity < sale.quantity;
    );
  // const result = await positive;
  console.log(`positive${positive}`);
  // console.log(saleInOrder);

  // if (positive[0]) return response
  //   .status(errorNotFound)
  //   .json(messageError('stock_problem', 'Such amount is not permitted to sell'));
    

  next();
};

// const resultado = saleInOrder.map(dado => {
//   return productsDB.filter(produto => {
//     return produto['_id'] === dado.productId && produto.quantity < dado.quantity;
//   });
// });


// if (resultado.length >= 1) return response
//   .status(errorNotFound)
//   .json(messageError('stock_problem', 'Such amount is not permitted to sell'));

// const result = saleInOrder.filter((sale) => {
//   const result = Products.findById(sale.productId);
//   if (result.quantity < sale.quantity) return response
//     .status(errorNotFound)
//     .json(messageError('stock_problem', 'Such amount is not permitted to sell'));
// })

module.exports = {
  validateQuantity,
  saleExists,
  idFormat,
  isQuantityInStock,
};
