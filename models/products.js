const connection = require('./connection');

const queryByName = async (collection, name) => {
  const db = await connection(collection);
  return await db.findOne({ name });
};

const insertProduct = async (collection, product) => {
  const { name, quantity } = product;
  const db = await connection(collection);
  const result = await db.insertOne(product);
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  queryByName,
  insertProduct,
};
