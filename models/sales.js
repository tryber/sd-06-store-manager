const { connect, ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (products) => {
  const { itensSold } = products;
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne(products));
  return { _id: insertedId, itensSold };
};

const getAllSales = async () => {
  return await connection().then((db) => db.collection('sales').find().toArray());
};

const getSalesById = async (id) => {
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSaleById = async (id, quantity, prodId) => {
  await connection().then((db) => db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { 'itensSold.$[elemento].quantity': quantity } },
    { arrayFilters: [{ 'elemento.productId': prodId }] },
  ));
  return { _id: id, itensSold: [{ productId: prodId, quantity }] };
};

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
  updateSaleById,
};

// db.sales.updateOne({ _id: ObjectId("603e3b952af0a31ce5c9bce4") }, { $set: { "itensSold.$[elemento].quantity": 10 } }, { arrayFilters: [{ "elemento.productId": "603da037ce9e3e7b7e01c860"} ]});

