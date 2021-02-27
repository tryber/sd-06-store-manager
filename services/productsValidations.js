const productsModel = require('../models/productsModel');
const resErrorPai = require('./useful/resError');

const collectionProducts = 'products';

const validationNameExists = async (req, res, next) => {
  const { resError } = resErrorPai(res);
  const { name } = req.body;

  const zero = 0;
  const erro422 = 422;

  const nameExistsLength = await productsModel.nameExists(collectionProducts, name)
    .then((array) => array.length);

  const bollError = resError(
    nameExistsLength !== zero,
    'Product already exists',
    erro422
  );
  if (!bollError) return;

  next();
};

const validationProductsBody = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { resError } = resErrorPai(res);

  const zero = 0;
  const cincoCaracteres = 5;
  const erro422 = 422;
  const bollError = resError(
    name.length < cincoCaracteres,
    '"name" length must be at least 5 characters long',
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

  await productsModel.uploadDB(collectionProducts, copyBody);

  res.locals.objAdicionado = copyBody;

  next();
};

const fatherFindIdAndTreatError = (callbackUpdate, callbackDelete) => {
  const findIdAndTreatError = async (req, res, next) => {
    const { resError } = resErrorPai(res);
    const { id } = req.params;
  
    const message = 'Wrong id format';
    const error422 = 422;
    
    try {
      if (callbackUpdate) await callbackUpdate(req, id);
      const product = await productsModel.findById(collectionProducts, id);
      if (callbackDelete) await callbackDelete(id);
      const bollError = resError(
        !product,
        message,
        error422
      );
      if (!bollError) return;
      res.locals.objProductId = product;
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
  return findIdAndTreatError;
};

const findIdAndTreatError = fatherFindIdAndTreatError();

const updateProductAndFindIdAndTreatError = fatherFindIdAndTreatError(
  async (req, id) => {
    const { body } = req;
    return await productsModel.updateForId(collectionProducts, id, body);
  }
);

const deleteProductAndFindIdAndTreatError = fatherFindIdAndTreatError(
  null,
  async (id) => await productsModel.deleteForId(collectionProducts, id)
);

// const putProducts = async (req, res, next) => {
//   const { id } = req.params;
  
//   console.log(req.body);
//   next();
// };

module.exports = {
  validationNameExists,
  validationProductsBody,
  postProducts,
  findIdAndTreatError,
  updateProductAndFindIdAndTreatError,
  deleteProductAndFindIdAndTreatError
};
