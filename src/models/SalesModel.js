const connection = require('./connection');
const { ObjectId } = require('mongodb');
const dbCollection = 'sales';
const { throwError } = require('../errorHandler/errorHandler');
const {status, errorMessages} = require('../errorHandler/utils/status');
const { response } = require('express');

const registerSale = async (products) => {
  const {insertedId} = await connection().then((db) => 
    db
      .collection(dbCollection)
      .insertOne({itensSold: products})
  );

  return insertedId;
};

const getAll = async () => {
  const sales = await connection().then((db) => 
    db
      .collection(dbCollection)
      .find()
      .toArray()
  );

  return sales;
};

const getById = async (id) => {
  const sale = await connection().then((db) => 
    db
      .collection(dbCollection)
      .findOne({_id: ObjectId(id)})
  ).catch(error => {
    throw new throwError(status.notFound, errorMessages.saleNotFound);
  });

  return sale;
};

const updateSale = async (id, sale) => {
  const {result: {nModified}} = await connection().then((db) => 
    db
      .collection(dbCollection)
      .updateOne({_id: ObjectId(id)}, {$set: {itensSold: sale}})
  );

  return nModified;
};

const deleteSale = async (id) => {
  const responsePayload = await connection().then((db) => {
    db
      .collection(dbCollection)
      .deleteOne({_id: ObjectId(id)});
  });

  return responsePayload;
};


module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale
};