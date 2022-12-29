import './db.js';
import app from './app.js';
import dotenv from 'dotenv';
import { LOCAL_HOST } from './variables.js';
import { LOCAL_PORT } from './variables.js';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || LOCAL_PORT;
const HOST = process.env.HOST || LOCAL_HOST;

app.listen({ port: PORT, host: HOST }, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
    throw error;
  }
  console.info(`Server listening on ${address}`);
});
