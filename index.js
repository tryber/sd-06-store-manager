const express = require('express');
const app = express();
const PORT = 3000;

const unprocEntity =422;

const controller = require('./controllers/controller');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controller.getAll);

app.post('/products', controller.create);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
