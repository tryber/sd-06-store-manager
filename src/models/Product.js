const connection = require('./connection');

const collectionName = 'products';

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection(collectionName).insertOne({
      name, quantity
    }));

  return insertedId ;
};

const getByName = async (name) => {
  
  const productResponse = await connection()
    .then((db) => db.collection(collectionName).find({
      name
    }).toArray());

  return productResponse;
};

const getAllProduct = async () => {

  const productResponse = await connection()
    .then((db) => db.collection(collectionName).find().toArray());

    return productResponse;
}

module.exports = {
  createProduct,
  getByName,
  getAllProduct,
};
