import CardRepositories from '../../repositories/cards.js';

function getCardsHandler(request, reply) {
  CardRepositories.getMany(request.query)
    .then((data) => reply.send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function getCardHandler(request, reply) {
  const { id } = request.params;
  CardRepositories.getOne(id)
    .then((data) => reply.send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function postCardsHandler(request, reply) {
  CardRepositories.create(request.body)
    .then((data) => reply.code(201).send({ id: data.insertedId, ...request.body }))
    .catch((error) => {
      reply.code(error.status || 500).send(error);
    });
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getCardsHandler,
  });
  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: getCardHandler,
  });
  fastify.route({
    method: 'POST',
    url: '/',
    handler: postCardsHandler,
  });
  done();
};
