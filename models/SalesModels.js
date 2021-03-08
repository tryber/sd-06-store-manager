const connection = require('./connection');

const COLLECTION = 'sales';

const registerSale = async (itensSold) => {
  return await connection().then((db) => db.collection(COLLECTION)
    .insertOne({itensSold})
    .then((item) => ({
      _id: item.insertedId,
      itensSold
    }))
  );
};

module.exports = {
  registerSale,
};
