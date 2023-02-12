let apps;

function init(db) {
  if (!apps) {
    apps = db.collection('favorites');
  }
}

function getMyFavorites(sub) {
  return apps.findOne({ _id: sub });
}

function addMyFavorites(sub, favoriteCard) {
  return apps.updateOne(
    { _id: sub },
    { $push: { favorites: { $each: [favoriteCard], $position: 0 } } },
    { upsert: true }
  );
}

function removeMyFavorites(sub, favoriteCard) {
  return apps.updateOne({ _id: sub }, { $pull: { favorites: favoriteCard } });
}

export default { init, getMyFavorites, addMyFavorites, removeMyFavorites };
