const connection  = require('./connection');

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

const postSale = async (sale) => {
  const saleCreate = await connection()
    .then((db) => db.collection('sales')
      .insertOne(({ itensSold: sale }))
    );
  return saleCreate.ops[0];
};

module.exports = {
  getAllSales,
  postSale,
};
