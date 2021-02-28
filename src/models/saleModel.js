const connection = require('../database/connection');
const { ObjectId } = require('mongodb');
const collection = 'sales';
const { throwError } = require('../utils/errorHandler');
const { status, errors } = require('../utils/status');
const { response } = require('express');

const createSale = async (sale) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(collection).insertOne({ itensSold: sale }),
  );

  return insertedId;
};

module.exports = {
  createSale,
};
