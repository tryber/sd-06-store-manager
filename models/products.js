const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (collection, product) => {
  const { name, quantity } = product;
  const db = await connection(collection);
  const result = await db.insertOne(product);
  return { _id: result.insertedId, name, quantity };
};

const queryByName = async (collection, name) => {
  const db = await connection(collection);
  return await db.findOne({ name });
};

const queryProducts = async (collection, id) => {
  try {
    const db = await connection(collection);
    return id
      ? await db.findOne({ _id: ObjectId(id) })
      : { products: await db.find().toArray() };
  } catch (err) {
    console.error(err);
    return [];
  }
};

const updateProduct = async (collection, id, data) => {
  const db = await connection(collection);
  await db.updateOne(
    { _id: ObjectId(id) },
    { $set: data },
  );
};

module.exports = {
  insertProduct,
  queryByName,
  queryProducts,
  updateProduct,
};
