const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function getAllProducts() {
  return await connection().then(db => db.collection('products').find({}).toArray());
}

async function findProductFromDb(id) {
  return await connection().then(db => db.collection('products').findOne(ObjectId(id)));
}

async function updateProductFromDb(id, name, quantity) {
  return await connection().then((db) => {
    return db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    );
  });
}

async function deleteProductFromDb(id) {
  return await connection().then((db) => {
    db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
}

module.exports = {
  getAllProducts,
  findProductFromDb,
  updateProductFromDb,
  deleteProductFromDb,
};
