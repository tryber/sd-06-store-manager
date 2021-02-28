const { Router } = require('express');
const bodyParser = require('body-parser');

const router = new Router();

router.use(bodyParser.json());

router.post('/sales', (req, res) => {
  
});