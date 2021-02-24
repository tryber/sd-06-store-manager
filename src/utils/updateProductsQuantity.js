function updateProductsQuantity(productInfo, toUpdateQuantity) {
  const { quantity } = productInfo;

  const updatedQuantity = quantity - toUpdateQuantity;

  const updatedProductInfo = {
    ...productInfo,
    id: productInfo._id,
    quantity: updatedQuantity,
  };

  return updatedProductInfo;
}

module.exports = updateProductsQuantity;
