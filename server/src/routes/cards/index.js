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

function updateCardStatus(request, reply) {
  if (request.user.sub !== process.env.ADMIN) {
    reply.code(500).send('Access denied');
  }
  const { id } = request.params;
  CardRepositories.updateStatusCard(id, request.body.value).then(() => reply.code(200).send());
}

function getCardsPending(request, reply) {
  if (request.user.sub !== process.env.ADMIN) {
    reply.code(500).send('Access denied');
  }
  CardRepositories.findPending()
    .then((data) => reply.code(200).send(data))
    .catch((error) => reply.code(error.status || 500).send(error));
}

function deleteCardHandler(request, reply) {
  const { id } = request.params;

  CardRepositories.deleteById(id, request.user.sub)
    .then((data) => {
      if (data.length > 0) {
        deleteFromS3(data);
      }
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
    url: '/admin',
    preValidation: fastify.authenticate,
    schema: Schemas.getCards,
    handler: getCardsPending,
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
    method: 'PUT',
    url: '/:id/status',
    preValidation: fastify.authenticate,
    schema: Schemas.updateStatus,
    handler: updateCardStatus,
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
