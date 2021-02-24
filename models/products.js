const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (collection, product) => {
  const db = await connection(collection);
  const result = await db.insertOne(product);
  return result.ops[0];
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

const deleteProduct = async (collection, id) => {
  const db = await connection(collection);
  return (await db.findOneAndDelete({ _id: ObjectId(id)}))['value'];
};

module.exports = {
  deleteProduct,
  insertProduct,
  queryByName,
  queryProducts,
  updateProduct,
};
