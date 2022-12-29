import { MongoClient } from 'mongodb';

import AppRepository from './repositories/cards.js';

MongoClient.connect(process.env.DB_URI)
  .then((client) => {
    const db = client.db('dev');
    AppRepository.init(db);
  })
  .catch((err) => console.error('Database connection error:', err));
