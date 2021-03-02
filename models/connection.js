const { MongoClient } = require('mongodb');

let connection;

const DB_NAME = 'StoreManager';
const DB_URI = `mongodb://mongodb:27017/${DB_NAME}`;
// const DB_URI = 'mongodb://localhost:27017/StoreManager'; // local

module.exports = async function (collection) {
  connection =
    connection || (await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  return connection.db(DB_NAME).collection(collection);
};

/*
const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
//const DB_URL = 'mongodb://localhost:27017/StoreManager'; // local
const DB_URL = 'mongodb://mongodb:27017/StoreManager'; // para o avaliador funcionar

async function connection(collectionName) {

  try {
    const connection =
      await MongoClient.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
    return connection.db(DB_NAME).collection(collectionName);

  } catch (error) {
    console.log(error);
  }
}

module.exports = connection; 
*/
