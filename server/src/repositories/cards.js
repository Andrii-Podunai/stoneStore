import { ObjectId } from 'mongodb';

let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('cards');
  }
}

function create(data, sub) {
  return apps.insertOne({ ...data, status: 'Pending', createdAt: Date.now(), createdBy: sub });
}

function getMany({ page, amount = 50 }, query) {
  if (page) {
    return apps
      .find(queryToDocument(query))
      .limit(+amount)
      .skip((page - 1) * +amount)
      .sort({ _id: -1 })
      .toArray();
  }

  throw new Error("Query 'page' dont send");
}

function getCount(query) {
  return apps.count({ ...queryToDocument(query) }); //when admin will be ready: "status: 'Active'"
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

async function updateById(id, doc, sub) {
  const myCard = await apps.findOne({ _id: ObjectId(id) });

  if (sub === myCard.createdBy) {
    const res = await apps.replaceOne(
      { _id: ObjectId(id) },
      { ...myCard, ...doc, status: 'Pending' }
    );
    return res.acknowledged;
  }

  const error = new Error('you have no control over this card');
  error.status = 404;
  throw error;
}

async function deleteById(id, sub) {
  const myCard = await apps.findOne({ _id: ObjectId(id) });

  if (sub === myCard.createdBy) {
    const res = await apps.deleteOne({ _id: ObjectId(id) });
    return res.deletedCount > 0;
  }

  const error = new Error('you have no control over this card');
  error.status = 404;
  throw error;
}

function getMyCards(sub) {
  return apps.find({ createdBy: sub }).toArray();
}

function queryToDocument(query) {
  const mapping = {
    type: function (value) {
      return { type: value };
    },
    category: function (value) {
      return { category: value };
    },
    search: function (value) {
      return { title: { $regex: value, $options: 'i' } };
    },
  };

  return Object.entries(query).reduce((acc, [key, value]) => {
    if (Boolean(value) === true) {
      return Object.assign(acc, mapping[key](value));
    }

    return acc;
  }, {});
}

export default { init, getMyCards, deleteById, getCount, updateById, create, getMany, getOne };
