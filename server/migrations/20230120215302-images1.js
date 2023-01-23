export const up = async (db) => {
  return db.collection('cards').updateMany(
    {},
    {
      $set: {
        images: [
          {
            url: 'https://vtormall.s3.eu-central-1.amazonaws.com/qe2fHCHASYyn1tywPseBN.webp',
            key: 'qe2fHCHASYyn1tywPseBN.webp',
            originalName: 'this-is-a-test-wp.webp',
          },
          {
            url: 'https://vtormall.s3.eu-central-1.amazonaws.com/Wm7x1Tb980MWfgN1H5UiS.webp',
            key: 'Wm7x1Tb980MWfgN1H5UiS.webp',
            originalName: 'this-is-a-test-wp.webp',
          },
        ],
      },
    }
  );
};

export const down = async () => {};
