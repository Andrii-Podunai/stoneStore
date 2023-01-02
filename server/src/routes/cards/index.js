import CardRepositories from '../../repositories/cards.js';
import Schemas from '../../schemas/index.js';

function getCardsHandler(request, reply) {
  CardRepositories.getMany(request.query)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function getCardHandler(request, reply) {
  const { id } = request.params;
  CardRepositories.getOne(id)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function postCardsHandler(request, reply) {
  CardRepositories.create(request.body)
    .then((data) => reply.code(201).send({ id: data.insertedId, ...request.body }))
    .catch((error) => {
      reply.code(error.status || 500).send(error);
    });
}

function updateCardHandler(request, reply) {
  const { id } = request.params;

  CardRepositories.updateById(id, request.body)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function deleteCardHandler(request, reply) {
  const { id } = request.params;

  CardRepositories.deleteById(id)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: Schemas.getCards,
    handler: getCardsHandler,
  });
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: Schemas.getCard,
    handler: getCardHandler,
  });
  fastify.route({
    method: 'POST',
    url: '/',
    schema: Schemas.createCard,
    handler: postCardsHandler,
  });
  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: Schemas.updateCard,
    handler: updateCardHandler,
  });
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: Schemas.deleteCard,
    handler: deleteCardHandler,
  });
  done();
};
