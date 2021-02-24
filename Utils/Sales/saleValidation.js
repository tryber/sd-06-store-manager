const UNCREATED = 422;
const IDLENGTH = 24;
const ZERO = 0;

module.exports = async (req, res, next) => {
  const sale = req.body;
  const { productId, quantity } = sale;

  if(!sale.length) {
    if(!productId || productId.length !== IDLENGTH ) {
      const err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };

      return res.status(UNCREATED).send({ err: err });
    };

    if(quantity <= ZERO) {
      const err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };

      return res.status(UNCREATED).send({ err: err });
    }

    if(typeof(quantity) !== 'number') {
      const err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };

      return res.status(UNCREATED).send({ err: err });
    }
  }

  if(sale.length > ZERO) {
    const lessThanZero = await sale.find(element => element.quantity <= ZERO);
    const invalidId = await sale.find(element => element.productId.length !== IDLENGTH);
    const notANumber = await sale.find(element => typeof(element.quantity) !== 'number');
    const noID = await sale.find(element => !element.productId);

    if(lessThanZero !== undefined || invalidId !== undefined ||
        notANumber !== undefined || noID !== undefined) {
      const err = {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      };

      return res.status(UNCREATED).send({ err: err });
    }
  }

  next();
};
