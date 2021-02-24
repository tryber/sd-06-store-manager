import dbConnection from './connection'
import { ObjectId } from 'mongodb'

interface IDocument {
  id?: string
  name?: string
  quantity?: number
}

const collection = dbConnection()
.then((db) => db.collection(process.env.PRODUCTS_TABLE_NAME))

collection.then(collection => collection.createIndex({ "name": 1 }, {unique: true}))

export const getAll = () => {
  return collection
    .then((collection) => collection.find().toArray())
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const getById = ({ id }: IDocument) => {
  return collection
    .then((collection) => collection.findOne({ _id: ObjectId(id) }))
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const create = async ({ name, quantity }: IDocument) => {
  const newDocument = { name: name, quantity: quantity };
  return await collection
    .then((collection) => collection.insertOne(newDocument))
    .then((createdDocument) => createdDocument.insertedId)
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const update = async ({ id, name, quantity }: IDocument) => {
  const newDocument = { name: name, quantity: quantity };
  return await collection
    .then((collection) => collection.updateOne({ _id: ObjectId(id) },
      { $set: { name: newDocument.name, quantity: newDocument.quantity } }))
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const remove = ({ id }: IDocument) => {
  return collection
    .then((collection) => collection.findOneAndDelete({ _id: ObjectId(id) }))
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}