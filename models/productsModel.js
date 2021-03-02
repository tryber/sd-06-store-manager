const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAllProducts = async () => { 
  return await connection().then((db) => db.collection(('products')).find({}).toArray());
};

const searchForProductId = async (id) => {
  if(ObjectID.isValid(id)) {
    return await connection().then((db) => db.collection(('products'))
      .findOne(ObjectID(id)));
  }
};

const searchForProductName = async (name) => { 
  return await connection().then((db) => db.collection(('products')).find({
    'name': name
  }).toArray());
};

const addNewProduct = async (name, quantity) => {
  return await connection().then((db) => db.collection('products').insertOne({
    name,
    quantity
  }));
};

const updateProduct = async (id, name, quantity) => {
  return await connection().then((db) => db.collection('products').updateOne(
    {
      '_id': ObjectID(id)
    },
    {
      $set: {
        'name': name,
        'quantity': quantity,
      }
    }
  ));
};

const deleteProduct = async (id) => {
  return await connection().then((db) => db.collection('products').findOneAndDelete(
    {
      '_id' : ObjectID(id)
    },
  ));
};

module.exports = {
  getAllProducts,
  addNewProduct,
  searchForProductName,
  searchForProductId,
  updateProduct,
  deleteProduct,
};
