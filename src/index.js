const express = require('express');
require('express-async-errors');

const routes = require('./routes/index.js');
const errorHandling = require('./middlewares/errorHandling');
const { auditInitialRequest } = require('./utils/audit.js');

const app = express();
const port = 3000;

app.use(express.json());

app.use(auditInitialRequest);

app.get('/', (_req, res) => {
  res.send();
});

app.use(routes);

app.use(errorHandling);

app.listen(port, () => console.log(`Store Manager Server listening on port ${port}!`));
