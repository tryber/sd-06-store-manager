const express = require('express');
const productRoutes = require('./Routes/productRoutes');
const saleRoutes = require('./Routes/saleRoutes');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', productRoutes);

app.use('/sales', saleRoutes);

app.listen(port, () => console.log(`Store Manager running on port ${port}!`));
