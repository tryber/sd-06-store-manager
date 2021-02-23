const { Router } = require('express');

const router = Router();

router.get('/', async (_request, response) => {
  response.status(200).json({message: 'ROUTE PRODUCTS WORKING'});
});

module.exports = router;
