function addToUpdateQuantityToMissingProducts(productList) {
  const updatedList = productList.map(transactionProds => {
    const { toUpdateQuantity } = transactionProds;

    if (toUpdateQuantity) return transactionProds;

    const { quantity: quantityToRestore } = transactionProds;

    const productWithUpdateInfo = {
      ...transactionProds,
      toUpdateQuantity: -quantityToRestore,
    };

    return productWithUpdateInfo;
  });

  return updatedList;
}

module.exports = addToUpdateQuantityToMissingProducts;
