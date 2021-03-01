const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection(DB_COLECTION).find().toArray());
};

const getByIdProduct = async (id) => {
  return connection()
    .then((db) => db.collection(DB_COLECTION).findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) => db.collection(DB_COLECTION).updateOne(
      { _id: ObjectId(id) }, { $set: { name, quantity } }
    ));
};


module.exports = {
  createNewProduct,
  getNameProduct,
  getAllProducts,
  getByIdProduct,
  updateProduct 
};
