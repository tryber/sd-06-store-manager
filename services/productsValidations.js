const productsModel = require('../models/productsModel');
const resErrorPai = require('./useful/resError');

const validationProductsBody = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { resError } = resErrorPai(res);

  const nameExistsLength = await productsModel.nomeJaExiste(name)
    .then((array) => array.length);

  const cincoCaracteres = 5;
  const erro422 = 422;
  const zero = 0;
  const bollError = resError(
    name.length < cincoCaracteres,
    '"name" length must be at least 5 characters long',
    erro422
  )
  && resError(
    nameExistsLength !== zero,
    'Product already exists',
    erro422
  )
  && resError(
    typeof quantity === 'string',
    '"quantity" must be a number',
    erro422
  )
  && resError(
    quantity === zero || quantity < zero,
    '"quantity" must be larger than or equal to 1',
    erro422
  );

  if (!bollError) return;

  next();
};

const postProducts = async (req, res, next) => {
  const { body } = req;
  const copyBody = { ...body };

  await productsModel.addProduct(copyBody);
  // console.log('body', body);
  // console.log('copyBody', copyBody);

  res.locals.objAdicionado = copyBody;

  next();
};

module.exports = {
  validationProductsBody,
  postProducts
};
