const { MongoClient, connect } = require('mongodb');

const DB_NAME = 'StoreManager';
const MONGODB_URL = 'mongodb://127.0.0.1:27017';
const connection = () => {
  return MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;

