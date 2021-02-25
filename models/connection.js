const { MongoClient } = require('mongodb');

// teste local
//const MONGO_DB_URL = 'mongodb://localhost:27017';

// teste gitHub
const MONGO_DB_URL = 'mongodb://mongodb:27017';
const DB_NAME = 'StoreManager';

const connection = () => {
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DB_NAME) )
    .catch((err)=>{
      process.exit();
    });
};

module.exports = connection;
