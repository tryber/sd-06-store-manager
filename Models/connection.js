const { MongoClient } = require('mongodb');

//avaliador 
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';


//local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DATABASE = 'StoreManager';

let keepConnection = null;
const connection = async() => { 
  keepConnection = keepConnection || await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return keepConnection.db(DATABASE);
};

// const connection = () => {
//   return MongoClient.connect(MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//     .then((conn) => conn.db(DB_NAME))
//     .catch((err) => {
//       console.error(err);
//       process.exit();
//     });
// };

module.exports = connection;