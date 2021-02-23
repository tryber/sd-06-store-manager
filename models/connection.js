const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';

const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;


const connection = async (collectionName) => {
  const connect = await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connect.db(DB_NAME).collection(collectionName);
};

module.exports = connection;