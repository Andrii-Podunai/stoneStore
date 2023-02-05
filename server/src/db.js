import { MongoClient } from 'mongodb';

import CardRepository from './repositories/cards.js';
import FavoritesRepository from './repositories/favorites.js';

MongoClient.connect(process.env.DB_URI)
  .then((client) => {
    const db = client.db('dev');
    CardRepository.init(db);
    FavoritesRepository.init(db);
  })
  .catch((err) => console.error('Database connection error:', err));
