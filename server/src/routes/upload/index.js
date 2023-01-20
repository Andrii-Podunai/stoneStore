import { uploadToS3 } from '../../aws-s3-services/upload.js';
import { deleteFromS3 } from '../../aws-s3-services/delete.js';

import { nanoid } from 'nanoid';

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
      const response = await uploadToS3(image, newFileName);
      if (response['$metadata'].httpStatusCode !== 200) {
        throw new Error(`aws response status=${response['$metadata'].httpStatusCode}`);
      }
      files.push({ url: response.Location, key: newFileName, originalName: image.filename });
    }
    reply.send(files);
  } catch (error) {
    reply.code(error.status || 500).send(error);
  }
}

async function deleteHandler(request, reply) {
  try {
    const response = await deleteFromS3(request.body);
    if (response['$metadata'].httpStatusCode !== 200) {
      new Error(`aws s3 status code = ${response['$metadata'].httpStatusCode}`);
    }
    reply.code(200);
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
  fastify.route({
    method: 'DELETE',
    url: '/',
    handler: deleteHandler,
  });
  done();
};
