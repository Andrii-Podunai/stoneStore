import { ObjectId } from 'mongodb';

let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('cards');
  }
}

function create(data) {
  return apps.insertOne({ ...data });
}

async function getMany({ page, amount = 50 }) {
  if (page) {
    return await apps
      .find()
      .limit(+amount)
      .skip((page - 1) * +amount)
      .sort({ $natural: -1 })
      .toArray();
  }
  throw new Error("Query 'page' dont send");
}

async function getOne(id) {
  const dbResponse = await apps.findOne({ _id: ObjectId(id) });
  if (dbResponse === null) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  return dbResponse;
}

async function updateById(id, doc) {
  const res = await apps.replaceOne({ _id: ObjectId(id) }, doc);

  return res.acknowledged;
}

async function deleteById(id) {
  const res = await apps.deleteOne({ _id: ObjectId(id) });
  return res.deletedCount > 0;
}

export default { init, deleteById, updateById, create, getMany, getOne };
