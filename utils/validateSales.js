const errorMessage = require('./errors');
const { verifyName } = require('../models/ProductsModel');
const { ObjectId } = require('mongodb');

const INVALID = 422;
const TYPEOF_ERROR = 'Wrong product ID or invalid quantity';

const validateSale = async (res, arr) => {
  if (arr.map((e) => {
    if (typeof e.quantity !== 'number') {
      res.status(INVALID).json(errorMessage(TYPEOF_ERROR));
      return false; 
    };
    if (e.quantity < 1) {
      res.status(INVALID).json(errorMessage(TYPEOF_ERROR));
      return false;
    };
  })) return true;
  
  return false;
};

module.exports = {
  validateSale
};