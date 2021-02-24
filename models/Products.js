// aqui realizar as conexões com o banco, as 'queries' para que os endpoints
// realizem as requisições

const connection = require('./connection');

const getAll = async (request, response) => {
  return await connection().then((db) => db.collection('products').find.toArray());
};

module.exports = {
  getAll,
};
