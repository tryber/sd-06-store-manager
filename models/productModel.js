const connection = require('./conection');

const createProduct = async (product) => {connection()
  .then((db) => db.collection('products').insertOne(product));
};

module.exports = { createProduct };
