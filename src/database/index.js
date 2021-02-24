const mongodb = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
// const MONGO_DB_URL = 'mongodb://mongodb:27017';
const MONGO_DB = 'StoreManager';

function connection() {
  return mongodb.MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(MONGO_DB))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
