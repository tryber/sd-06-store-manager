const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const handleError = require('./middlewares/handleError');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.use('/products', productController);
app.use('/sales', salesController);

app.use(handleError);

app.listen(PORT, () => console.log(`Patiently Waiting on port: ${PORT}`));
