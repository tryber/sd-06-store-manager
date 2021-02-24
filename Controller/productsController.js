const productsService = require('../Service/productsService');
const { Router } = require('express');
const { validateNameSize, productAlreadyExits, quantityNotNegativeOrZero,
  quantityNotAString } = require('../Middlewares/validation');

const router = Router();
const Created = 201;

// Requisito-1 obs:Deve criar e retornar o objeto 
router.post('/', validateNameSize, productAlreadyExits,
  quantityNotNegativeOrZero, quantityNotAString,
  async(req, res) => {
    const { name, quantity } = req.body;
    await productsService.createProductService(name, quantity);
  
    const newProduct = await productsService.productByNameService(name);
    return res.status(Created).json(newProduct);
  });

module.exports = router;