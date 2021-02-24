const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  // return await connection().then(db => db.collection('products').find().toArray());
  const getAllItens = await connection()
    .then(db => db.collection('products').find().toArray());

  // escrevendo 'products' antes do retorno
  return {
    products: getAllItens
  };
};

const create = async (name, quantity) => {
  console.log(name, quantity);
  const { insertedId } = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));

  return {
    _id: insertedId,
    name,
    quantity
  };
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  //se for um HEX recebe: null
  //se for um HEX q existe: retorna o objeto todo
  return await connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));
  // return {
  //   products: getAllItens
  // };
  
};

const findByName = async (name) => {
  return await connection().then(db => db.collection('products').findOne( { name } ));

};

const update = async (id, name, quantity) => {
  if(!ObjectId.isValid(id)) return null;

  // return await connection().then(db => db.collection('products').updateOne(
  await connection().then(db => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  ));

  return {
    _id: ObjectId(id),
    name,
    quantity
  };
};

const remove = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const check = await findById(id);
  if (!check) {
    return null; //console.log('nao existe');
  }
  // return await connection().then(db => db.collection('products').deleteOne(
  await connection().then(db => db.collection('products').deleteOne(
    { _id: ObjectId(id) }
  ));
  return check;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  findByName,
};