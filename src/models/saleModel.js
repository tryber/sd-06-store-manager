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

const getAllSales = async () => {
  const sales = await connection().then((db) =>
    db.collection(collection).find().toArray(),
  );

  return sales;
};

const getSaleById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }))
    .catch((error) => {
      throw new throwError(status.notFound, errors.saleNotFound);
    });

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
