const
  express = require('express'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv'),
  ProductsRouter = require('./controllers/ProductsRouter'),
  SalesRouter = require('./controllers/SalesRouter');

const
  app = express(),
  port = 3000;

dotenv.config();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);

app.use('/sales', SalesRouter);

app.get('/test', (req, res) => res.send('Hello Project!'));
app.listen(port, () => console.log(`MyStoreApp active and listening on port ${port}!`));
