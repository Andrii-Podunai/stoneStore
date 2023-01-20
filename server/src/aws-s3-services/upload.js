import { Upload } from '@aws-sdk/lib-storage';
import { s3 } from './index.js';

export function uploadToS3({ file, mimetype }, filename) {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: 'vtormall',
      Key: filename,
      Body: file,
      ContentType: mimetype,
    },
  });
  upload.on('s3 upload progress', () => {});
  return upload.done();
}
