import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import createProductsCollection from './createProductsCollection'

// DOTENV CONFIGURATION
config()

const dbConnection = () => {
  return MongoClient.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((connection) => connection.db(process.env.DB_NAME))
  .catch((_error) => {
    console.log('Database connection was not established!')
    process.exit()
  });
}

export default dbConnection;