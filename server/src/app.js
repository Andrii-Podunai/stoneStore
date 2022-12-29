import path from 'path';

import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

import cardsRoutes from './routes/cards/index.js';
import uploadRoutes from './routes/upload/index.js';
import staticCardsImgRoutes from './routes/static/cards-images/index.js';

const __dirname = path.resolve();

const app = fastify();

app.register(fastifyHelmet);
app.register(fastifyMultipart);
app.register(fastifyCors);
app.register(fastifyStatic, { root: path.join(__dirname, 'public'), prefix: '/public' });

app.register(cardsRoutes, { prefix: '/cards' });
app.register(uploadRoutes, { prefix: '/upload' });
app.register(staticCardsImgRoutes, { prefix: '/public/cards-images' });

export default app;
