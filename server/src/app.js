import path from 'path';

import fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyCors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

import myCardsRoute from './routes/my/index.js';
import cardsRoutes from './routes/cards/index.js';
import uploadRoutes from './routes/upload/index.js';
import staticCardsImgRoutes from './routes/static/cards-images/index.js';
import fastifyAuth0Verify from 'fastify-auth0-verify';

const __dirname = path.resolve();

const app = fastify();

app.register(fastifyHelmet);
app.register(fastifyMultipart);
app.register(fastifyCors);
app.register(fastifyStatic, { root: path.join(__dirname, 'public'), prefix: '/public' });
app.register(fastifyAuth0Verify, {
  domain: process.env.AUTH0_DOMAIN,
  secret: process.env.AUTH0_SECRET,
});

app.register(cardsRoutes, { prefix: '/cards' });
app.register(myCardsRoute, { prefix: '/my' });
app.register(uploadRoutes, { prefix: '/upload' });
app.register(staticCardsImgRoutes, { prefix: '/public/cards-images' });

export default app;
