
const registerProducts = (req, res, next) => {
  const { name, quantity } = req.body;
  // const { id } = req.params;
  const five = 5;
  const unprocessable = 422;
  const zero = 0;

  if(name.length < five) res.status(unprocessable).json({ err: {
    code: 'invalid_data', message: '"name" length must be at least 5 characters long'
  }});

  if(quantity < zero) res.status(unprocessable).json({ err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
  }});

  if(quantity === zero) res.status(unprocessable).json({ err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1'
  }});

  if(typeof quantity !== 'number') res.status(unprocessable).json({ err: {
    code: 'invalid_data', message: '"quantity" must be a number'
  }});
  
  next();
};

module.exports = registerProducts;