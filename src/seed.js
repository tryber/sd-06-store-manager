db.products.insertMany([
  { name: 'Produto Silva', quantity: 10 },
  { name: ' Silva', quantity: 4 },
  { name: 'Novo Teste', quantity: 8 }
]);

db.sales.insertMany({ itensSold: [{ productId: '123', quantity: 2 }] });