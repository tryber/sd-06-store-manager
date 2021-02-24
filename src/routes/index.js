const { Router } = require('express');

const productsRouter = require('./products');
const salesRouter = require('./sales');

const router = Router();

// não remova esse endpoint, e para o avaliador funcionar
router.get('/', (_request, response) => {
  response.send();
});

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
