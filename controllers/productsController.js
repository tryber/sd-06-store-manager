const { Router } = require('express');
const bodyParser = require('body-parser');

const { validateProducts } = require('../middlewares/validateProducts');

const router = new Router();

router.use(bodyParser.json());

router.post('/', validateProducts, async (req, res) => {});

module.exports = router;
