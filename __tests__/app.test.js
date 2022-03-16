const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('catologue routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});

it('should create a cat', async () => {
  const res = await request(app)
    .post('/api/v1/cats')
    .send({ name: 'Thor', age: 2, favoriteToy: 'Socks' });
    
  expect(res.body).toEqual({
    id: expect.any(String),
    name: 'Thor',
    age: 2,
    favoriteToy: 'Socks',
  });
});
