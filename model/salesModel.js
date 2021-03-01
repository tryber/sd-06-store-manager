const getconnection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await getconnection('sales').then((db) => db.find().toArray());
};

const getId = async (id) => {
  return await getconnection('sales').then((db) => db.findOne({ _id: ObjectId(id) }));
};

const putId = async (id, itensSold ) => {
  return await getconnection('sales').then((db) => {
    db.updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  })
    .catch((error) => console.log(error.message));
};

const create = async (itensSold) => {
  const { insertedId } = await getconnection('sales').then((db) =>
    db.insertOne({ itensSold }));
  const newSale = {
    _id: insertedId,
    itensSold
  };
  console.log(newSale, 'create');
  return newSale;
};

const deleteSales = async (id) => {
  await getconnection('sales').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};


module.exports = {
  create,
  deleteSales,
  putId,
  getId,
  getAll,
};
