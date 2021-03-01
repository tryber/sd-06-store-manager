const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const DB_COLECTION = 'products';

const createNewProduct = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection(DB_COLECTION).insertOne({ name, quantity }),
  );

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getNameProduct = async (name) =>
  connection().then((db) => db.collection(DB_COLECTION).findOne({name}));



module.exports = {
  createNewProduct,
  getNameProduct
};
