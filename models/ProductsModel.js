const conn = require('./connection');

const findByName = async (name) => await conn()
  .then(db => db.collection('products').findOne({ name }));

const insertProduct = async (product) => {
  const { insertedId } = await conn()
    .then(db => db.collection('products').insertOne(product));
  return insertedId;
};

module.exports = {
  findByName,
  insertProduct,
};