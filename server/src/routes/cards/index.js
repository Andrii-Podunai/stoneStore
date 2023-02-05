import CardRepositories from '../../repositories/cards.js';
import Schemas from '../../schemas/index.js';
import { deleteFromS3 } from '../../aws-s3-services/delete.js';

function getCardsHandler(request, reply) {
  const query = {
    type: request.query.type,
    category: request.query.category,
    search: request.query.search,
  };
  CardRepositories.getMany(request.query, query)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function getCountHandler(request, reply) {
  CardRepositories.getCount(request.query)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function getCardHandler(request, reply) {
  const { id } = request.params;
  CardRepositories.getOne(id)
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function createCardHandler(request, reply) {
  CardRepositories.create(request.body, request.user.sub)
    .then(() => reply.code(201).send())
    .catch((error) => {
      reply.code(error.status || 500).send(error);
    });
}

function updateCardHandler(request, reply) {
  const { id } = request.params;

  CardRepositories.updateById(id, request.body, request.user.sub)
    .then(() => reply.code(200).send())
    .catch((error) => reply.code(error.status || 500).send(error));
}

function deleteCardHandler(request, reply) {
  const { id } = request.params;

  CardRepositories.deleteById(id, request.user.sub)
    .then((data) => {
      deleteFromS3(data);
      reply.code(200).send(data);
    })
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
    url: '/count',
    schema: Schemas.getCount,
    handler: getCountHandler,
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
    preValidation: fastify.authenticate,
    schema: Schemas.createCard,
    handler: createCardHandler,
  });
  fastify.route({
    method: 'PUT',
    url: '/:id',
    preValidation: fastify.authenticate,
    schema: Schemas.updateCard,
    handler: updateCardHandler,
  });
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    preValidation: fastify.authenticate,
    schema: Schemas.deleteCard,
    handler: deleteCardHandler,
  });
  done();
};
