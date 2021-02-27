const validNameLength = 5;
const zero = 0;
const UNPROCESSABLE_ENTITY = 422;

function setValidation (req, res, next) {
  const { name, quantity }= req.body;
  if(name.length < validNameLength){
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err:{
          code:'invalid_data',
          message: '"name" length must be at least 5 characters long',
        }
      }
    )
  };
  if(!Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err:{
          code:'invalid_data',
          message: '"quantity" must be a number',
        }
      }
    )
  };
  if(quantity <= zero){
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err:{
          code:'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        }
      }
    )
  };
}

async function setValidationName (req, res, next) {
  const { name } = req.body;
  const response = await getByName(name);
  if(response) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err:{
          code:'invalid_data',
          message: 'Product already exists',
        }
      }
    )
  }
  next();
}

module.exports = {
  setValidation,
  setValidationName,
}


