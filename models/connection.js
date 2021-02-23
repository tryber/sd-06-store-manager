const { MongoClient } = require('mongodb');

const MONGO_DB_URL_LOCAL = 'mongodb://127.0.0.1:27017/StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

// COMMENT CONNECTION BELOW BEFORE PUSHING TO GITHUB!!

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });
}

// UNCOMMENT CONNECTION BELOW BEFORE PUSHING TO GITHUB!!

// const connection = () => {
//   return MongoClient.connect(MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then((conn) => conn.db(DB_NAME))
//   .catch((err) => {
//     console.error(err);
//     process.exit();
//   });
// }

module.exports = connection;