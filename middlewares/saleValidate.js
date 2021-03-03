module.exports = async (req, res, next) => {
  const array = req.body;

  const zero = 0;
  const ERROR = 422;
  const five = 5;
  let valid = true;
  array.forEach((item) => {
    const { quantity } = item;
    if (quantity <= zero || typeof quantity !== 'number') {
      valid = false;
    }
  });
  if (!valid) {
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }

  next();

};