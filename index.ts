import express from 'express'
import bodyParser from 'body-parser'
import routes from './api/controllers'
import { config } from 'dotenv'

// DOTENV CONFIGURATION
config()

const app = express();

app.use(bodyParser.json());

app.use('/', routes)

app.listen(process.env.APPLICATION_PORT, () => console.log('Server is running!'));



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//-------------------------------------------------------------