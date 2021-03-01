const { Router } = require('express');
const bodyParser = require('body-parser');

const { validatePostProducts } = require('../middlewares/validatePostProducts');
const { validateGetProductsById } = require('../middlewares/validateGetProductsById');
const { validateGetAllProducts } = require('../middlewares/validateGetAllProducts');
const { validatePutProducts } = require('../middlewares/validatePutProducts');
const { validateDeleteProducts } = require('../middlewares/validateDeleteProducts');

const SUCCESS = 200;
const BAD = 422;
const ZERO = 0;

const router = new Router();

router.use(bodyParser.json());


router.get('/:id', validateGetProductsById, async (req, res) => {});

router.get('/', validateGetAllProducts, async (req, res) => {});

router.post('/', validatePostProducts, async (req, res) => {});

router.put('/:id', validatePutProducts, async (req, res) => {});

router.delete('/:id', validateDeleteProducts, async (req, res) => {});

module.exports = router;
