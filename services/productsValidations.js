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

  res.locals.objAdicionado = copyBody;

  next();
};

const findIdAndResError = async (req, res, next) => {
  const { resError } = resErrorPai(res);
  const { id } = req.params;

  const message = 'Wrong id format';
  const error422 = 422;
  
  try {
    const ola = await productsModel.findById(id);
    if (!resError(
      !ola,
      message,
      error422
    )) return;
    res.locals.objProductId = ola;
  } catch {
    resError(
      true,
      message,
      error422
    );
    return;
  }
  next();
};

module.exports = {
  validationProductsBody,
  postProducts,
  findIdAndResError
};
