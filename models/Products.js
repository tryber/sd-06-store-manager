const connection = require('./connection');

const createProduct = async (product) => {
  const { name, quantity } = product;
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne(product));

  return {
    _id: insertedId,
    name,
    quantity
  };
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name: name }))
    .catch((err) => {
      console.error(err);
    });
  console.log(product);
  return product;
};

module.exports = {
  createProduct,
  findByName,
};