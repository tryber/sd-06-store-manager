const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertToDb = async (collection, data) => {
  const db = await connection(collection);
  const result = await db.insertOne(data);
  return result.ops[0];
};

const queryFromDb = async (collection, id) => {
  try {
    const db = await connection(collection);
    return id
      ? await db.findOne({ _id: ObjectId(id) })
      : { [collection]: await db.find().toArray() };
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  insertToDb,
  queryFromDb,
};
