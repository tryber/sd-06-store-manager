const connection = require('./connection');

const getAll = async() => {
  return await connection.then(db => db.collection('sales').find().toArray());
};

// const create = async(name) => {
//   return await connection.then(db => db.collection('products').insertOne({name}));
// };

module.exports = {
  getAll
};