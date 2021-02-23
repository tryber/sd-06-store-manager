const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (sale) => {
  const newSale = { itensSold: [...sale] };
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne(newSale))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
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

const update = async (product) => {
  try {
    const { id, name, quantity } = product;
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    await connection()
      .then((db) => db.collection('products')
        .updateOne({ _id: ObjectID(id) }, { $set: { product } }));

    return product;
  } catch(e) {
    throw new Error(e);
  }
};

const remove = async (id) => {
  try {
    return await connection()
      .then((db) => db.collection('products').deleteOne({ _id: ObjectID(id) }));
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