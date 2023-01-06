import { ObjectId } from 'mongodb';

let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('cards');
  }
}

function create(data) {
  return apps.insertOne({ ...data, status: 'Pending', createdAt: Date.now() });
}

async function getMany({ page, amount = 50 }, query) {
  if (page) {
    return await apps
      .find(queryToDocument(query))
      .limit(+amount)
      .skip((page - 1) * +amount)
      .sort({ _id: -1 })
      .toArray();
  }

  throw new Error("Query 'page' dont send");
}

async function getCount() {
  return await apps.count({ status: 'Active' });
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
  const res = await apps.replaceOne({ _id: ObjectId(id) }, { status: 'Pending', ...doc });

  return res.acknowledged;
}

async function deleteById(id) {
  const res = await apps.deleteOne({ _id: ObjectId(id) });
  return res.deletedCount > 0;
}

function queryToDocument(query) {
  const mapping = {
    type: function (value) {
      return { type: value };
    },
    category: function (value) {
      return { category: value };
    },
  };

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (Boolean(value) === true) {
      return Object.assign(acc, mapping[key](value));
    }

    return acc;
  }, {});
}

export default { init, deleteById, getCount, updateById, create, getMany, getOne };
