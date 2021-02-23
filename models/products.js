const connection = require('./connection');

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  create
};
