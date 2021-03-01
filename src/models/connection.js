const { MongoClient } = require('mongodb');

const evalautor = true;
const MONGODB_URL = evalautor
  ? 'mongodb://mongodb:27017/StoreManager'
  : 'mongodb://localhost:27017/StoreManager';
const DATABASE = 'StoreManager';

const connection = () =>
  MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch((_err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
