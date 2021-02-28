db.products.insertMany({ name: 'Produto Silva', quantity: 10 });

db.sales.insertMany({ itensSold: [{ productId: '123', quantity: 2 }] });