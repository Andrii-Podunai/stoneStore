export const up = async (db) => {
  return db
    .collection('cards')
    .updateMany({ type: { $exists: false } }, { $set: { type: 'sell' } });
};

export const down = async () => {
  // return db.collection('cards').updateMany({ type: { $exists: true } }, { $set: { type: 'sell' } });
};
