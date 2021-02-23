const { MongoClient } = require('mongodb');

require('dotenv').config();
const MONGO_DB_URL = process.env.IS_LOCAL ? 'mongodb://localhost:27017/StoreManager' : 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.log(err);
    process.exit();
  });

module.exports = connection;
