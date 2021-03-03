const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (result) => {
  const { insertedId } = await connection()
    .then(mongodb => mongodb.collection('sales').insertOne({
      itensSold: result
    }));

  return insertedId;
};

module.exports = {
  createSale
};