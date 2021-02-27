const { MongoClient } = require('mongodb');

let connection;

const DB_NAME = 'StoreManager';
const DB_URL = 'mongodb://localhost:27017';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

async function getCollection(collectionName) {
  connection =
    connection ||
    (await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));

  return connection.db(DB_NAME).collection(collectionName);
}

module.exports = getCollection;