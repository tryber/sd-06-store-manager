const connection = require('./connection');

const create = async (sale) => {
  await connection().then((db) => {
    db.collection('sales').insertOne({ itensSold: sale });
  });

  const createdSale = await connection().then((db => db.collection('sales')
    .find().toArray()));

  return createdSale[createdSale.length - 1];
};

module.exports = {
  create,
};
