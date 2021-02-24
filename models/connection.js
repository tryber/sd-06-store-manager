const { MongoClient } = require('mongodb');

// Conexão do banco local. Alterar ao dar push.
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// Conexao para o avalidor do github funcionar normalmente.
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

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
