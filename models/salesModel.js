const { ObjectId } = require('mongodb');
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

const getSales = async () => {
  const sales = await connect
    .then((item) => item.find());

  return sales.toArray();
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const saleById = await connect
    .then((sales) => sales)
    .then((sale) => sale.findOne({ _id: ObjectId(id) }));

  return saleById;
};

const updateSale = async (id, query) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connect
    .then((item) => item.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          itensSold: query[0]
        }
      }
    ));

  return {
    _id: id,
    itensSold: query,
  };
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  updateSale,
};