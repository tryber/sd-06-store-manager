const { getCollection } = require('./connection');

const connect = getCollection('sales');

const createSale = async (query) => {
  const insertedSale = await connect
    .then((item) => item.insertOne({ itensSold: query }));

  return {
    _id: insertedSale.insertedId,
    itensSold: query,
  };

};

module.exports = {
  createSale,
};