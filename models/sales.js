const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (sales) => {
  return await connection()
    .then((item) => item.collection('sales').insertOne({itensSold: sales }));
};

const getSales = async (id) => {
  if (id) {
    return await connection()
      .then((item) => item.collection('sales').findOne(ObjectID(id)));
  }
  return await connection()
    .then((item) => item.collection('sales').find().toArray());
};

const changeSales = async (id, sale) => {
  const validId = ObjectID.isValid(id);
  if (validId === false) return validId;
  return await connection()
    .then((item) => item.collection('sales')
      .updateOne({ _id: ObjectID(id) }, { $set: { itensSold: sale } }));
};

const deleteSale = async (id) => {
  return await connection()
    .then((item) => item.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getSales,
  changeSales,
  deleteSale
};
