const connection = require('./connection');

const create = async (name, quantity) => {
  const { insertedId } = await connection().then(db => db.collection('products')
    .insertOne({ name: name, quantity: quantity }));

  return {
    id: insertedId,
    name: name,
    quantity: quantity
  };
};

const checkName = async (name) => {
  const check =  await connection().then(db => db.collection('products')
    .findOne({ name: name }));
  // console.log(check);
  if (check) return true;
  return false;
};

module.exports = {
  create,
  checkName,
};
