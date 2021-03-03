const
  express = require('express'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv'),
  productsRouter = require('./controllers/productsRouter');

const
  app = express(),
  port = 3000;

dotenv.config();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.get('/test', (req, res) => res.send('Hello Project!'));
app.listen(port, () => console.log(`MyStoreApp active and listening on port ${port}!`));
