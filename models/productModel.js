const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = (newProduct) => connection()
  .then((db) => db.collection('products')
    .insertOne(newProduct)
  );

const allProducts = () => connection()
  .then((db) => db.collection('products')
    .find().toArray() 
  );

const productById = async (id) => connection()
  .then((db) => db.collection('products')
    .findOne(ObjectId(id))
  );
  
const updateProduct = async (id, name, quantity) => connection()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));

const deleteProduct = async (id) => connection()
  .then((db) => db
    .collection('products')
    .deleteOne({ _id: ObjectId(id) }));

module.exports = { addProduct, allProducts, productById, updateProduct, deleteProduct };