const { MongoClient } = require('mongodb');

// Teste Local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
