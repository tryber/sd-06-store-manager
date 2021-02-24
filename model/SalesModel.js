const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = async (arrayProductsSold) => {
  const registeredSale = {
    itensSold: arrayProductsSold,
  };

  const { insertedId } = await connection().then((db) => {
    return db.collection('sales').insertOne(registeredSale);
  });

  return insertedId;
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  return connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  registerSale,
  getAll,
  getById
};
