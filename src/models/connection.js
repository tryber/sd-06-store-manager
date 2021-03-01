const { MongoClient } = require('mongodb');
require('../../.env');

//Avaliador
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const MONGO_DB_URL = IS_LOCAL ? 
//   'mongodb://localhost:27017/StoreManager'
//   : 
//   'mongodb://mongodb:27017/StoreManager'; 
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



