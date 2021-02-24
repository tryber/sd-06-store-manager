const connection = require('./connection');

const createSale = async (data) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }));
  const { insertedId } = sale;
  return {
    _id: insertedId,
    itensSold: data,
  };
};

module.exports = {
  createSale,
};
