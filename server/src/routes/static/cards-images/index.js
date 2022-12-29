import path from 'path';

function staticCardsImgHandler(req, reply) {
  reply.sendFile(req.params.name, path.join(process.cwd(), 'public', 'cards-images'));
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'GET',
    url: '/:name',
    handler: staticCardsImgHandler,
  });
  done();
};
