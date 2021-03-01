const { MongoClient } = require('mongodb');

const isEvaluator = true;

const MONGO_DB_URL = (isEvaluator) ?  'mongodb://mongodb:27017/StoreManager'
  : 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  return await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      process.exit();
    });
};

module.exports = connection;
