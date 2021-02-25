const MongoClient = require('mongodb').MongoClient;

const DB_NAME = 'StoreManager';
// const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://mongodb:27017/${DB_NAME}`;
// const MONGO_DB_URL = 'mongodb://localhost:27017'; // local
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
/* const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager'; // avaliador */

let connection = null;
const getConnection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;
