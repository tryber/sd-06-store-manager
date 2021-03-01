const connection = require('./connection');
const { ObjectId } = require('mongodb');

const DB_COLECTION = 'sales';

const createNewSale = async (objectSales) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({
      itensSold: objectSales }),
  );

  return {
    _id: insertedId,
    itensSold: objectSales,
  };
};

const getAllSales = async () =>
  connection().then((db) => db.collection(DB_COLECTION).find().toArray());

const getByIdSales = async (id) =>
  connection().then((db) => db.collection(DB_COLECTION).findOne(ObjectId(id)));

const updateSales = async (id, productId, quantity) =>
  connection().then((db) => db.collection(DB_COLECTION).updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold:[ { productId, quantity } ] } }
  ));

const deleteSales = async (id) =>
  connection().then((db) => db.collection(DB_COLECTION).deleteOne(
    { _id: ObjectId(id) }
  ));

module.exports = {
  createNewSale,
  getAllSales,
  getByIdSales,
  updateSales,
  deleteSales
};
