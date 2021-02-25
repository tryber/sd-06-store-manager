const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./controllers/ProductController');
const port = 3000;


const app = express();

app.use(bodyParser.json());

app.use('/products', ProductController);

app.listen(port, () => console.log('i can heaaarr youuu 3000'));
