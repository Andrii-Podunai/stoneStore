import CardRepositories from '../../repositories/cards.js';
import FavoritesRepositories from '../../repositories/favorites.js';
import Schemas from '../../schemas/index.js';

function getMyCardsHandler(request, reply) {
  CardRepositories.getMyCards(request.user.sub)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function getMyFavoritesHandler(request, reply) {
  FavoritesRepositories.getMyFavorites(request.user.sub)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function addMyFavoritesHandler(request, reply) {
  FavoritesRepositories.addMyFavorites(request.user.sub, request.body)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function removeMyFavoritesHandler(request, reply) {
  FavoritesRepositories.removeMyFavorites(request.user.sub, request.body)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'GET',
    url: '/cards',
    preValidation: fastify.authenticate,
    schema: Schemas.getCards,
    handler: getMyCardsHandler,
  });
  fastify.route({
    method: 'GET',
    url: '/favorites',
    preValidation: fastify.authenticate,
    handler: getMyFavoritesHandler,
  });
  fastify.route({
    method: 'POST',
    url: '/favorites',
    preValidation: fastify.authenticate,
    handler: addMyFavoritesHandler,
  });
  fastify.route({
    method: 'PATCH',
    url: '/favorites',
    preValidation: fastify.authenticate,
    handler: removeMyFavoritesHandler,
  });

  done();
};
