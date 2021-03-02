const { Router } = require('express');
const bodyParser = require('body-parser');

const { addNewSale } = require('../models/salesModel');

const router = new Router();

router.use(bodyParser.json());

router.post('/', async (req, res) => {
  // console.log();

  await addNewSale(req.body);
});

module.exports = router;