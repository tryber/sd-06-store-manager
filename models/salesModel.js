const getCollection = require('./connection');
const { ObjectId } = require('mongodb');

const collection = 'sales';

const create = async (sales) => {
  const salesDB = await getCollection(collection);

  const newSales = { itensSold: sales };
  const result = await salesDB.insertOne({ ...newSales });

  return { _id: result.insertedId, ...newSales };
};

const getAll = async () => {
  const dataBase = await getCollection(collection);
  return await dataBase.find().toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const dataBase = await getCollection(collection);

  return await dataBase.findOne(ObjectId(id));
};

const updateById = async (id, sale) => {
  const dataBase = await getCollection(collection);
  const { productId, quantity } = sale[0];

  const result = await dataBase.findOneAndUpdate(
    { _id : ObjectId(id) },
    { $set: { 'itensSold': [{ productId, quantity } ]} },
    { returnOriginal: false });

  return result['value'];
};

const deleteById = async (id) => {
  const dataBase = await getCollection(collection);
  return (await dataBase.findOneAndDelete({ _id: ObjectId(id)}))['value'];
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};
