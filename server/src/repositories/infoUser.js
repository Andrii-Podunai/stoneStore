let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('infoUser');
  }
}

async function getMyInfo(sub) {
  const dbResponse = await apps.findOne({ _id: sub });
  if (dbResponse === null) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  return dbResponse;
}

function addMyInfo(sub, myInfo) {
  return apps.updateOne(
    { _id: sub },
    { $push: { information: { $each: [myInfo], $position: 0 } } },
    { upsert: true }
  );
}

async function removeMyInfo(sub, myInfo) {
  const dbResponse = await apps.updateOne({ _id: sub }, { $set: { information: myInfo } });
  if (dbResponse === null) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  return dbResponse;
}

export default { init, getMyInfo, addMyInfo, removeMyInfo };
