export const up = async (db, client) => {
  return db
    .collection('cards')
    .updateMany({ createdAt: { $exists: false } }, { $set: { createdAt: Date.now() } });
};

export const down = async (db, client) => {
  return db;
  // .collection('cards')
  // .updateMany({ createdAt: { $exists: true } }, { $set: { createdAt: Date.now() } });
};
