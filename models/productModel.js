const getCollection = require('./connection');
const { ObjectId } = require('mongodb');

const collection = 'products';

const create = async (name, quantity) => {
  const dataBase = await getCollection(collection);
  const result = await dataBase.insertOne({ name, quantity });

  return { _id: result.insertedId, name, quantity };
};

const getByName = async (name) => {
  const product = await getCollection(collection);
  return await product.findOne({ name });
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

const updateById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const dataBase = await getCollection(collection);

  const productUpdate = {
    name,
    quantity,
  };

  const result = await dataBase.findOneAndUpdate(
    { _id : ObjectId(id) },
    { $set: productUpdate },
    { returnOriginal: false });

  return result['value'];
};

const deleteById = async (id) => {

  const dataBase = await getCollection(collection);

  const result = await dataBase.findOneAndDelete(
    { _id: ObjectId(id) },
    { returnOriginal: false });

  return result['value'];
};

module.exports = {
  getAll,
  getById,
  create,
  getByName,
  updateById,
  deleteById,
};
