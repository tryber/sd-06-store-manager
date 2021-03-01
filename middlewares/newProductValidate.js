module.exports = async (req, res, next) => {
  const { name, quantity } = req.body;

  const zero = 0;
  const ERROR = 422;
  const five = 5;

  if (typeof name !== 'string' || !name) {
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if (typeof name === 'string' && name.length < five) {
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    });
  }

  if ((!quantity && quantity !== zero) || (typeof quantity !== 'number')) {
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    });
  }

  if (!quantity || quantity <= zero) {
    return res.status(ERROR).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    });
  }

  next();

};