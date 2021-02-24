const mongodb =  require('mongodb');

const connection =  require('../index.js');

const collectionName = 'sales';

class Product {
  async create(itensSold) {
    const db = await connection();

    const queryInfo = await db.collection(collectionName).insertOne({
      itensSold,
    });

    const [newSale] = queryInfo.ops;

    return newSale;
  }

  async listAll() {
    const db = await connection();

    const sales = await db.collection(collectionName).find().toArray();

    return sales;
  }

  async findByID(id) {
    const db = await connection();

    const saleInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return saleInfo;
  }

  async update({ id, itensSold }) {
    const db = await connection();

    const newSale = {
      itensSold
    };

    await db.collection(collectionName).updateOne(
      { _id: mongodb.ObjectId(id) },
      { $set: newSale },
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
