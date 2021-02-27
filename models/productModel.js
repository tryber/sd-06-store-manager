const connection = require('./connection');

const addProduct = (newProduct) => connection()
  .then((db) => db.collection('products')
    .insertOne(newProduct) );

const allProducts = () => connection()
  .then((db) => db.collection('products')
    .find().toArray() );

const productById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)));

module.exports = { addProduct, allProducts, productById };