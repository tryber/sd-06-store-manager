const connection = require('../database/connection');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => {
      return products;
    });
};

const findByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').find({name: name}).toArray())
    .then((res) => res);
};

const registerProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}))
    .then((result) => result);

  return {
    id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  registerProduct,
  findByName
};


