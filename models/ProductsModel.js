const connection = require('./connection');

const getAll = async () => 
  connection()
    .then((db) => db.collection('products').find().toArray());

const create = async (name, quantity) => 
  await connection()
    .then((db) => 
      db.collection('products').insertOne({ name, quantity}));

const verifyName = async (name) => {
  const verify = await connection()
    .then(db => db.collection('products').findOne({ name: name }));
  console.log(verify);
  if (verify) return true;
  return false;
};

module.exports = {
  getAll,
  create,
  verifyName
};