const express = require('express')

const app = express()
const port = 3000

app.get('/', (_request, response) => response.send());

app.listen(port)