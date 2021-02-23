const connection = require('./connection');

const createProduct = async (req, res, product) => {
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
    .then((db) => db.collection('products').findOne({ name: name }));
  console.log(product);
  return product;
};

module.exports = {
  createProduct,
  findByName,
};