const addToUpdateQuantityToProducts = require('./addToUpdateQuantityToProducts');

function addProductOrUpdateProductList({
  productList,
  productToUpdate,
  toUpdateQuantity,
  shouldUpdate,
}) {
  let updatedList = productList;

  if (shouldUpdate) {
    updatedList = addToUpdateQuantityToProducts(
      updatedList,
      { idToUpdate: productToUpdate.productId, toUpdateQuantity },
    );
  } else {
    updatedList = [...updatedList, productToUpdate];
  }

  return updatedList;
}

module.exports = addProductOrUpdateProductList;
