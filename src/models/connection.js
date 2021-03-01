const { MongoClient } = require('mongodb');

const MONGODB_URL = //'mongodb://127.0.0.1:27017/StoreManager';
  'mongodb://mongodb:27017/StoreManager';
const DATABASE = 'StoreManager';

const connection = async () => {
  return await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch((_err) => {
      process.exit();
    });
};
module.exports = connection; 
