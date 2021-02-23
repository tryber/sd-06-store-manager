const { MongoClient } = require('mongodb');

const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';
const DATABASE = 'StoreManager';

const connection = async () => {
  return await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch((err) => {
      process.exit(err);
    });
};

module.exports = connection;
