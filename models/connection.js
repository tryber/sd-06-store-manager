const { MongoClient } = require('mongodb');

const MONGODB_URL_LOCAL = 'mongodb://localhost:127.0.0.1.27017/StoreManager';
const MONGODB_URL_EVALUATOR = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient.connect(MONGODB_URL_LOCAL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then((con) => con.db(DB_NAME))
  .catch((err) => process.exit());

module.exports = connection;
