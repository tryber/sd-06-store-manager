const connection  = require('./connection');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const postProducts = async ({ name, quantity }) => {
  return await connection()
    .then((db) => db.collection('products')
      .insertOne(({
        name,
        quantity
      }))
    );
};

module.exports = {
  getAllProducts,
  postProducts,
};
