const connection = require('./connection');

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

module.exports = {
  createNewSale,
  getAllSales,
  getByIdSales
};
