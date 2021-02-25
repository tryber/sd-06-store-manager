import dbConnection from './connection'
import { ObjectId } from 'mongodb'

interface IDocument {
  id?: string
  itensSold?: { productId: string, quantity: number }[]
}

const collection = dbConnection()
.then((db) => db.collection(process.env.SALES_TABLE_NAME))

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

export const create = async ({ itensSold }: IDocument) => {
  const newDocument = { itensSold: itensSold };
  return await collection
    .then((collection) => collection.insertOne(newDocument))
    .then((createdDocument) => createdDocument.insertedId)
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const update = async ({ id, itensSold }: IDocument) => {
  const newDocument = { itensSold: itensSold };
  return await collection
    .then((collection) => collection.updateOne({ _id: ObjectId(id) },
      { $set: { itensSold: newDocument.itensSold } }))
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}

export const remove = async ({ id }: IDocument) => {
  return await collection
    .then((collection) => collection.findOneAndDelete({ _id: ObjectId(id) }))
    .catch((_err) => ({ error: 'Was not possible to perform query' }))
}
