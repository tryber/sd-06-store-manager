const { create, findByName } = require('../models/productsModels');
const { status, Messages } = require('../util/dataStatus');


const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const nameInMongoDb = await findByName(name);

  if(nameInMongoDb !== null) {
    return res.status(status.notFormated).json(Messages.productExist);
  }

  const result = await create(name, quantity);    
  return res.status(status.create).json(result);
};


module.exports = {
  createProduct
};