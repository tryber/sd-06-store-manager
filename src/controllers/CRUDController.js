const { Router } = require('express');
const { setValidation, setValidationName } = require('../middlewares/validations');
const { getAllService, createService } = require('../services/CRUDServices');
const router = Router();
const CREATED = 201;
const SUCCESS = 200;
const UNPROCESSABLE_ENTITY = 422;

router.post('/', setValidation, setValidationName, async(req, res) => {
 const { name, quantity } = req.body;
 const newProduct = await createService(name, quantity);
 return res.status(CREATED).json(newProduct)
})

router.get('/', async (req, res) => {
  const getAll = getAllService();
  return res.status(SUCCESS).json({ products: getAll })
})

module.exports = router;
