import CardRepositories from '../../repositories/cards.js';
import Schemas from '../../schemas/index.js';

function getMyCardsHandler(request, reply) {
  CardRepositories.getMyCards(request.user.sub)
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

  done();
};
