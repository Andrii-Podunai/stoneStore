export const up = async (db, client) => {
  return db
    .collection('cards')
    .updateMany({ status: { $exists: false } }, { $set: { status: 'Active' } });
};

export const down = async (db, client) => {
  // return db.collection('cards').updateMany({}, { $unset: { currency: null } });
};
