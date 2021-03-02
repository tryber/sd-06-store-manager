const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => { 
  return await connection().then((db) => db.collection(('products')).find({}).toArray());
};

const searchForProductId = async (id) => {
  if(ObjectId.isValid(id)) {
    return await connection().then((db) => db.collection(('products'))
      .findOne(ObjectId(id)));
  }

  return false;
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
      '_id': ObjectId(id)
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
      '_id' : ObjectId(id)
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
