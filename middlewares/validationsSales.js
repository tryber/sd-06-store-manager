const error = 422;
const numberZero = 0;
const numberOne = 1;
const lengthSize = 24;
const salesNotFoundErro = 404;

const messageError = (code, message) => {
  return {err: { code, message, }};
};

const quantitySalesValidation = (req, res, next) => {
  const sales = req.body;

  const invalidQuantity = sales
    .filter((sale) => 
      (sale.quantity <= numberZero) || (typeof sale.quantity !== 'number'));

  if (invalidQuantity.length >= numberOne) 
    return res.status(error)
      .json(messageError('invalid_data', 'Wrong product ID or invalid quantity'));

  next();
};
const salesValidation = async (req, res, next) => {
  const { id } = req.params;

  if ((id.length !== lengthSize) || (id.length === lengthSize && 
    await Sales.findSalesById(id) === null)) 
    return res.status(salesNotFoundErro)
      .json(messageError('not_found', 'Sale not found'));

  next();
};

const idSalesValidation = async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== lengthSize) 
    return res.status(error).json(
      messageError('invalid_data', 'Wrong sale ID format'));

  next();
};


module.exports = {
  quantitySalesValidation,
  salesValidation,
  idSalesValidation,
};
