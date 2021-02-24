const express = require('express');
const bodyParser = require('body-parser');
const { ProductController, SaleController } = require('./controllers');
const { error } = require('./services');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);
app.use('/sales', SaleController);

app.use(error);

const PORT = 3000;
app.listen(PORT, () => console.log(`O PAI TÁ ON ${PORT} VEZES!`));
