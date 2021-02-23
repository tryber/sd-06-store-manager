const connection = require('./connection');
const dbCollection = 'products';

const registerProduct = async (name, quantity) => {
  const insertedObject = await connection().then((db) => 
    db
      .collection(dbCollection)
      .insertOne({name, quantity})
  );

  return insertedObject;
};

const findByName = async (name) => {
  const product = await connection().then((db) => 
    db
      .collection(dbCollection)
      .findOne({name})
  );

  return product;
};

module.exports = {
  registerProduct,
  findByName,
};