export const up = async (db, client) => {
  return db
    .collection('cards')
    .updateMany(
      { createdBy: { $exists: false } },
      { $set: { createdBy: 'uR8v9XncKyla1PUVSEQYrD8UyyDA5ZL4@clients' } }
    );
};

export const down = async (db, client) => {
  return db
    .collection('cards')
    .updateMany(
      { createdBy: { $exists: false } },
      { $set: { createdBy: 'uR8v9XncKyla1PUVSEQYrD8UyyDA5ZL4@clients' } }
    );
};
