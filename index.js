const express = require('express');

const app = express();
const port = 3000;

const appRoutes = require('./routes');

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(appRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
