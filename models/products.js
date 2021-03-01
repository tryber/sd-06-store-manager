const { ObjectID } = require('mongodb');
const connection = require('./connection');

const findName = async (name) => {
  const result = await connection()
    .then((item) => item.collection('products').findOne({ name: name }))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  return result;
};

const create = async (product) => {
  const { name, quantity } = product;
  const { insertedId } = await connection()
    .then((item) => item.collection('products').insertOne(product))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  return { 
    _id: insertedId,
    name,
    quantity
  };
};

// const getProducts = async () => {

// };

const getProducts = async (id) => {
  if (id) {
    return await connection()
      .then((item) => item.collection('products').findOne(ObjectID(id)));
  }
  return await connection()
    .then((item) => item.collection('products').find().toArray());
};

module.exports = {
  findName,
  create,
  getProducts
};
