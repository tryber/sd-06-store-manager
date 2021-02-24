const mongodb =  require('mongodb');

const connection =  require('../index.js');

const collectionName = 'products';

class Product {
  async create(productInfo) {
    const { name, quantity } = productInfo;

    const db = await connection();

    const queryInfo = await db.collection(collectionName).insertOne({
      name,
      quantity,
    });

    const [newProductData] = queryInfo.ops;

    return newProductData;
  }

  async listAll() {
    const db = await connection();

    const products = await db.collection(collectionName).find().toArray();

    return products;
  }

  async findByName(name) {
    const db = await connection();

    const [product] = await db.collection(collectionName).find({
      name
    }).toArray();


    return product;
  }

  async findByID(id) {
    const db = await connection();

    const productInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return productInfo;
  }

  async update({ id, name, quantity }) {
    const db = await connection();

    const newProductInfo = {
      name,
      quantity,
    };

    await db.collection(collectionName).updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: newProductInfo },
    );

    const updatedInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return updatedInfo;
  }

  async deleteByID(userID) {
    const db = await connection();

    await db.collection(collectionName).deleteOne(
      { _id: mongodb.ObjectId(userID) },
    );
  }
}

module.exports = Product;
