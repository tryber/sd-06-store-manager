const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSale = async (collection, sale) => {
  const db = await connection(collection);
  const result = await db.insertOne(sale);
  return result.ops[0];
};

module.exports = {

};
