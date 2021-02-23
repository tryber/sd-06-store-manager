const connection = require('./connection');

const registerProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  registerProduct,
};
