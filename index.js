const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => response.send());

app.use(routes);

app.listen(PORT, () => console.log(`Patiently Waiting on port: ${PORT}`));
