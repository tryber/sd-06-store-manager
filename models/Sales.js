const connection = require('./Connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const newSale = { itensSold: sale };
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(newSale));

  return {
    _id: insertedId,
    ...newSale,
  };
};

module.exports = {
  create
};
