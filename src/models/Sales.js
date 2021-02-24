const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const getAll = async () => {
  return await connection().then((db) => db.collection(collection).find().toArray());
};

const getById = async (id) => {
  return await connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const insertSale = async (salesArr) => {
  const fullSale = [
    { itensSold: [...salesArr] }
  ];

  const insertedIds = await connection().then((db) => db.
    collection(collection).insertMany(fullSale));

  const id = insertedIds.ops[0]._id;
  const result = {
    _id: id,
    itensSold: [
      ...salesArr
    ]
  };

  return (result);
};

const updateSale = async (id, productId, qnt) => {
  return await connection().then((db) => db.collection(collection).
    updateOne(
      {_id: ObjectId(id) },
      { $set: {
        itensSold: [{ productId: productId, quantity: qnt }]
      }}
    ));
};

module.exports = {
  getAll,
  getById,
  insertSale,
  updateSale,
};
