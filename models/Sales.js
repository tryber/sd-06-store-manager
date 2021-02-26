const connection = require('./connection');

const getAll = async () => {
  return await connection().then(db => db.collection('sales').find().toArray());
};

const create = async (sales) => {
  return await connection().then(db => 
    db.collection('sales').insertOne({ sales }));
};

module.exports = {
  getAll,
  create,
};