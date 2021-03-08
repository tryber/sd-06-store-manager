const { ObjectId } = require('mongodb');
const { findSaleById } = require('../models/salesModel');
const connection = require('../models/connection');

const quantityValue = 0;
const CREATED = 201;
const OK = 200;
const deuRuin = 422;
const nunAchei = 404;

/**
 * Função que valida a quantidade de produtos vendidos
 * @param {*} array com id e quantidade do(s) produto(s) vendido 
 */
const validingQuantity = (req, res, next) => {
  const itensSold = req.body;
  
  const result = itensSold
    .find(item => item.quantity <= quantityValue
      || typeof item.quantity !== 'number');
  
  if (result) {
    return res.status(deuRuin).json(
      {
        err: {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        }
      }
    );
  }
  next();
};

/**
 * Objeto que valida se uma venda existe
 */
const validingSale = async (req, res, next) => {
  const { id } = req.params;
  const seeSale = await connection().then((db) => db
    .collection('sales').findOne(ObjectId(id)));
  
  if (!seeSale) {
    return res.status(nunAchei).json(
      {
        err: {
          'code': 'not_found',
          'message': 'Sale not found',
        }
      }
    );
  }
  next();
};

module.exports = {
  validingQuantity,
  validingSale
};
