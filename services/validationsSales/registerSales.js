const registerSales = (req, res, next) => {
  const { quantity } = req.body[0];
  console.log(typeof quantity);

  const ZERO = 0;
  const UNPROCESSABLE = 422;

  if(quantity < ZERO) res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity'
  }});

  if(quantity === ZERO) res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity'
  }});

  if(typeof quantity !== 'number') res.status(UNPROCESSABLE).json({ err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity'
  }});

  next();
};

module.exports = registerSales;