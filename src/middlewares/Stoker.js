const connection = require('../models/connection');


const atualizarEstoque = async (produto, acao) => {
  produto.map((item) => {
    estoque = connection().then((db) => db
      .collection('products').findOne(item.productId));
    
    switch (acao) {
    case 'cadastrar':
      console.log('cadastrar');
      break;
    case 'atualizar':
        estoque atual = 10
        venda = 8
        estoque atual = 2


        atualizar = 4 - 8


      console.log('autalizar');
      break;

    default:
      
    }
  });
};
