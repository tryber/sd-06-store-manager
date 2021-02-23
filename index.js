const express = require('express');
const Products = require('./models/Products');
const ProductsController = require('./controllers/ProductsController');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//

app.use('/products', ProductsController);

//app.listen(port, () => console.log('Example app listening on port port!'));
app.listen(port, () => console.log(`Start http://localhost:${port}`));
