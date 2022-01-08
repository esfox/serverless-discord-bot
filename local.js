import Fastify from 'fastify';
import handler from './api/index.js';

Fastify()
  .post('/', handler)
  .listen(3000, () => console.log('we live'));
