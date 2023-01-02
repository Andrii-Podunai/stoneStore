export const up = async (db, client) => {
  return db
    .collection('cards')
    .updateMany({ name: { $exists: false } }, { $set: { name: 'Alex' } });
};

export const down = async (db, client) => {
  //   return db.collection('cards').updateMany({}, { $unset: { currency: null } });
};
