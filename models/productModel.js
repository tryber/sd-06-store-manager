const connection = require('./connection');

const addProduct = (newProduct) => connection()
  .then((db) => db.collection('products')
    .insertOne(newProduct) );

const allProducts = () => connection()
  .then((db) => db.collection('products')
    .find().toArray() );

module.exports = { addProduct, allProducts };