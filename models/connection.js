const { MongoClient } = require('mongodb');

const URLLOCAL = 'mongodb://localhost:27017/StoreManager';
//const URLLOCAL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';


const connection = () => {
  return MongoClient
    .connect(URLLOCAL, {
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