const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  return await connection().then((db) => db
    .collection('sales')
    .insertOne(sale));
};

const findAllSales = async () => {
  return await connection().then((db) => db
    .collection('sales')
    .find()
    .toArray()
  );
};

const findSaleById = async (id) => {
  return await connection().then((db) => db
    .collection('sales')
    .findOne({ _id: ObjectId(id) })
  );
};

const removeSale = async (id) => {
  return await connection().then(db => db
    .collection('sales')
    .deleteOne(
      { _id: ObjectId(id) }
    ));
};

const updateProductInSale = async (id, saleToBeUpdated) => {
  const sale = await findSaleById(id);

  return await connection().then(db => db
    .collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: saleToBeUpdated } }
    )
  );
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
  removeSale,
  updateProductInSale,
};
