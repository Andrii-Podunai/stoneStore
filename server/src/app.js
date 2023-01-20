import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';

import myCardsRoute from './routes/my/index.js';
import cardsRoutes from './routes/cards/index.js';
import uploadRoutes from './routes/upload/index.js';
import fastifyAuth0Verify from 'fastify-auth0-verify';

const app = fastify();

app.register(fastifyHelmet);
app.register(fastifyMultipart);
app.register(fastifyCors);
app.register(fastifyAuth0Verify, {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
});

app.register(cardsRoutes, { prefix: '/cards' });
app.register(myCardsRoute, { prefix: '/my' });
app.register(uploadRoutes, { prefix: '/upload' });

export default app;
