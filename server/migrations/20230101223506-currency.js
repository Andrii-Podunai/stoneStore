export const up = async (db, client) => {
  return db
    .collection('cards')
    .updateMany({ currency: { $exists: false } }, { $set: { currency: 'dollar' } });
};

export const down = async (db, client) => {
  // return db.collection('cards').updateMany({}, { $unset: { currency: null } });
};
