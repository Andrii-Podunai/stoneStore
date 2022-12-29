import fs from 'fs';
import path from 'path';
import pump from 'pump';

import { nanoid } from 'nanoid';

const __dirname = path.resolve();

async function uploadHandler(request, reply) {
  try {
    const files = [];
    const images = await request.files();
    for await (const image of images) {
      if (image.fieldname !== 'files[]') {
        throw new Error('field name should be `files[]`');
      }
      const imageType = image.filename.match(/\.(jpg|png|webp|jpeg)/g)[0];
      const newFileName = nanoid() + imageType;
      const storedFile = fs.createWriteStream(
        __dirname + '/public/' + '/cards-images/' + newFileName
      );
      await pump(image.file, storedFile);
      files.push({ name: newFileName, originalName: image.filename });
    }
    reply.send(files);
  } catch (error) {
    reply.code(error.status || 500).send(error);
  }
}

export default (fastify, __, done) => {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: uploadHandler,
  });
  done();
};
