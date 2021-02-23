const connection = require('./connection');

const getProductCount = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').count({name}));
  return result;
};

const create = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return ({_id: insertedId, name, quantity});
};

module.exports = {
  create,
  getProductCount
};