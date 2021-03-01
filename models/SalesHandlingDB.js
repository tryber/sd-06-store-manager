const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  const { insertedId } = await connection()
    .then(db => db.collection('sales').insertOne( { itensSold } ));
  return  {
    _id: insertedId,
    itensSold
  };
};

const getAll = async () => {
  const listAll = {
    sales: await connection().then(db => db.collection('sales').find().toArray())
  };
  return listAll;
};

const getForId = async (id) => {
  return await connection().then(db => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, itensSold) => {
  await connection().then(db => db.collection('sales')
    .updateOne(
      {_id: ObjectId(id)},
      {$set: { itensSold }}
    ));
  const _id =id;
  return {_id, itensSold };
};

const deleteSale = async (id) => {
  const resulDelete =  await connection().then(db => db.collection('sales')
    .findOneAndDelete(
      { _id: ObjectId(id) },
      { returnOriginal: false }));
  return resulDelete.value;
};

module.exports = { create, getAll, getForId, update, deleteSale };
