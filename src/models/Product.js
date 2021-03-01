const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const findByName = async (productName) => {
  const result = await connection()
    .then((db) => db.collection('products')
      .findOne({ name: productName }));
  
  return result;
};

const create = async (name, quantity) => {
  const alreadyExists = await findByName(name);
  if (alreadyExists) return false;
  
  const {insertedId} = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  create,
  findByName,
};
