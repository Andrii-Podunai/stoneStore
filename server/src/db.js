import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import CardRepository from './repositories/cards.js';
import FavoritesRepository from './repositories/favorites.js';
import InfoUserRepository from './repositories/infoUser.js';

dotenv.config();

MongoClient.connect(process.env.DB_URI)
  .then((client) => {
    const db = client.db('dev');
    CardRepository.init(db);
    FavoritesRepository.init(db);
    InfoUserRepository.init(db);
  })
  .catch((err) => console.error('Database connection error:', err));

// sudo brew services start mongodb/brew/mongodb-community

// Після цього спробуйте ще раз підключитися, використовуючи:
// mongosh -u admin -p admin --authenticationDatabase admin
