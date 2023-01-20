import { s3 } from './index.js';

export function deleteFromS3(images) {
  const deleteArr = images.map((name) => {
    return {
      Key: name,
    };
  });
  const params = {
    Bucket: 'vtormall',
    Delete: {
      Objects: deleteArr,
      Quiet: false,
    },
  };
  return s3.deleteObjects(params);
}
