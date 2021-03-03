const connection  = require('./connection');
const { ObjectId } = require('mongodb');

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

const findById = async (id) => {
  const product = await connection()
    .then((db) => db
      .collection('products')
      .findOne({_id: ObjectId(id)})
    ).catch(() => {
      return false;
    });
  return product;
};

module.exports = {
  getAllProducts,
  postProducts,
  findById
};
