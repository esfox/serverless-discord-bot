const Fastify = require('fastify');
const handler = require('./api/index.js');

Fastify()
  .post('/', handler)
  .listen(3000, () => console.log('we live'));
