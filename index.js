// não remova esse endpoint, e para o avaliador funcionar
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager'

app.get('/', (_request, response) => {
  response.send();
});
