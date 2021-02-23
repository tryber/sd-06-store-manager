const { MongoClient } = require('mongodb');


let connection;

const DB_NAME = 'StoreManager';
const DB_URI = `mongodb://localhost:27017/StoreManager/${DB_NAME}`;

module.exports = async function (collection) {
  connection =
    connection || (await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  return connection.db(DB_NAME).collection(collection);
};
