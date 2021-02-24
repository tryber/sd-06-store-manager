const { MongoClient } = require('mongodb');
// como demonstrado na thread de 23/02/2021:
// [https://trybecourse.slack.com/archives/C016CCMKN9E/p1614101963083000?thread_ts=1614101179.079500&cid=C016CCMKN9E]
require('dotenv').config();

const MONGODB_URL = process.env.IS_LOCAL ?
  'mongodb://127.0.0.1:27017':
  'mongodb://mongodb:27017';
const DATABASE = 'StoreManager';

const connection = async () => {
  return await MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((connection) => connection.db(DATABASE))
    .catch((err) => {
      process.exit();
    });
};

module.exports = connection;
