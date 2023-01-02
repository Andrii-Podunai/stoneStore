const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url:
      'mongodb+srv://fe3-final-project:0xQU8FxDOpQjB7FP@app.2h3fm8i.mongodb.net/?retryWrites=true&w=majority' ||
      'mongodb://localhost:27017',

    // TODO Change this to your database name:
    databaseName: 'dev',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },

  // The migrations dir can be a relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The MongoDB collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
  moduleSystem: 'esm',
};

export default config;
