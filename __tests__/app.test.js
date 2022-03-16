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

it('should be able to list a cat by id', async () => {
  const cat = await Cat.insert({ name: 'Thor', age: 2, favoriteToy: 'Sock' });
  const res = await request(app).get(`/api/v1/cats/${cat.id}`);
  expect(res.body).toEqual(cat);
});

it('should be able to list cats', async () => {
  await Cat.insert({ name: 'Thor', age: 2, favoriteToy: 'Socks' });
  const res = await request(app).get('/api/v1/cats');
  expect(res.body).toEqual([
    {
      id: expect.any(String),
      name: 'Thor',
      age: 2,
      favoriteToy: 'Socks'
    }
  ]);
});

it('should be able to update a cat', async () => {
  const cat = await Cat.insert({ name: 'Thor', age: 2, favoriteToy: 'Socks' });
  const res = await request(app)
    .patch(`/api/v1/cats/${cat.id}`)
    .send({ name: 'Liam', age: 2, favoriteToy: 'Catnip' });

  const expected = {
    id: expect.any(String),
    name: 'Liam',
    age: 2,
    favoriteToy: 'Catnip',
  };
  expect(res.body).toEqual(expected);
  expect(await Cat.getById(cat.id)).toEqual(expected);
});
