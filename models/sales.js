const connection = require('./connection');
const mongo = require('mongodb');

const coll = 'sales';

const insertSale = async (sale) => {
  const { ops: [insertedSale] } = await connection().then((db) => (
    db.collection(coll).insertOne({ itensSold: sale })
  ));
  
  return insertedSale;
};

module.exports = {
  insertSale
};