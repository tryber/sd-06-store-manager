const connection = require('./connection');

const create = async (productId, quantity) => {
  const creation = connection()
    .then((db) => db.collection('sales').insertOne({productId, quantity}));
  return creation;
};

module.exports = {
  create,
};
