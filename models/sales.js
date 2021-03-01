const connection = require('./connection');

const addSales = async (products) => {
  const { itensSold } = products;
  const { insertedId } =  await connection()
    .then((db) => db.collection('sales').insertOne(products));
  return { _id: insertedId, itensSold };
};

module.exports = {
  addSales
};


// db.sales.insertOne({
//   itensSold: [
//     { productId: "a1ed5d6e7asdfv45ert1da5e", quantity: 2 },
//     { productId: "a1ed5d6e7asdfv45ert1da6f", quantity: 3 }
//   ]
// });