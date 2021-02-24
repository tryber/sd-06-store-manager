function addToUpdateQuantityToProducts(productList, { idToUpdate, toUpdateQuantity }) {
  const updatedProducts = productList.map(oldProduct => {
    if (oldProduct.productId !== idToUpdate) return oldProduct;

    const productWithUpdateInfo = {
      ...oldProduct,
      toUpdateQuantity,
    };

    return productWithUpdateInfo;
  });

  return updatedProducts;
}

module.exports = addToUpdateQuantityToProducts;
