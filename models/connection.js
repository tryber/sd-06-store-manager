const { MongoClient } = require('mongodb');

// Procedimento ensinado pelo Nato em uma thread de dúvida;
// const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';

const MONGODB_URL = process.env.IS_LOCAL ?
  'mongodb://localhost:27017/StoreManager' :
  'mongodb://127.0.0.1:27017';

const DB_NAME = process.env.DB_NAME;

const connection = () => {
  return MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;