exports.option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Description',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
      {
        url: 'https://gromaida.org/api',
      },
    ],
  },
  apis: ['./app/swagger/*.js'],
};
