const { deleteProduct, searchForProductId } = require('../models/productsModel');

const ERROR422 = 422;
const SUCCESS = 200;

const validateDeleteProducts = async (req, res, next) => {
  const { id } = req.params;

  const foundProduct = await searchForProductId(id);

  if(!foundProduct) {
    return res.status(ERROR422).json(
      {
        err:
        {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      }
    );
  }

  await deleteProduct(id);
  res.status(SUCCESS).json(foundProduct);
};

module.exports = {
  validateDeleteProducts,
};
