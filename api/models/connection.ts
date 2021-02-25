import { MongoClient } from 'mongodb'
import { config } from 'dotenv'

// DOTENV CONFIGURATION
config()

// ALTERNATIVA AO DOTENV
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'
const MONGO_DB_URLX = 'mongodb://localhost:27017/StoreManager'
const DB_NAME = 'StoreManager'


const dbConnection = () => {
  return MongoClient.connect(
    process.env.MONGO_DB_URL || MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((connection) => connection.db(process.env.DB_NAME || DB_NAME))
  .catch((_error) => {
    console.log('Database connection was not established!')
    process.exit()
  });
}

export default dbConnection;