const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const salesById = async (id) => getConnection('sales')
  .then((sales) => sales.findOne(ObjectId(id)));

const sale = async (itensSold) =>
  getConnection('sales')
    .then((sales) => sales.insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

module.exports = {
  salesById,
  sale,
};
