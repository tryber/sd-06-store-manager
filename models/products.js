const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { id: insertedId, name, quantity };
};

const getProducts = async () => {
  return await connection().then((db)=> db.collection('products').find().toArray());
};

module.exports = { addProduct, getProducts };
