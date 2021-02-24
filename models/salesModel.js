const { ObjectID } = require('mongodb');
const productsModel = require('./productsModel');
const connection = require('./connection');

const create = async (sale) => {
  const newSale = { itensSold: [...sale] };
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(newSale))
    .catch((err) => {
      console.log(err);
    });

  return {
    _id: insertedId,
    ...newSale,
  };
};

const getAll = async () => {
  try {
    const result = await connection()
      .then((db) => db.collection('sales').find().toArray());

    return result;
  } catch(e) {
    throw new Error(e);
  }
};

const findName = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name: name }))
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });

  return result;
};


const findId = async (id) => {
  try {
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    const result = await connection()
      .then((db) => db.collection('sales').findOne(ObjectID(id)));

    return result;
  } catch(e) {
    throw new Error(e);
  }
};

const update = async (sale) => {
  try {
    const { id, itensSold } = sale;
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    await connection()
      .then((db) => db.collection('sales')
        .updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }));

    return { _id: ObjectID(id), itensSold };
  } catch(e) {
    console.log(e);
  }
};

const remove = async (id) => {
  try {
    const result = await connection()
      .then((db) => db.collection('sales').deleteOne({ _id: ObjectID(id) }));

    return result.deletedCount;
  } catch(e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  findName,
  findId,
  getAll,
  update,
  remove
};