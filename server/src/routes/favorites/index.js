import CardRepositories from '../../repositories/cards.js';

function getMyFavorites(request, reply) {
  CardRepositories.getMyFavorites(request.user.sub)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'GET',
    url: '/favorites',
    preValidation: fastify.authenticate,
    handler: getMyFavorites,
  });

  done();
};
