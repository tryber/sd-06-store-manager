const Sales = require('../../services/sales');
const SUCCESS = 200;

module.exports = async (_req, res) => {

  const products = await Sales.getAllSales()
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).json({ 'sales': products });
};