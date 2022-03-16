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


  it('should create a cat', async () => {
    const expected = {
      catName: 'Thor',
      age: 2,
      favoriteToy: 'Sock',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);
    
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should be able to list a cat by id', async () => {
    const cat = await Cat.insert({ catName: 'Thor', age: 2, favoriteToy: 'Sock' });
    const res = await request(app).get(`/api/v1/cats/${cat.id}`);
    expect(res.body).toEqual(cat);
  });

  it('should be able to list cats', async () => {
    await Cat.insert({ catName: 'LS', age: 4, favoriteToy: 'String' });
    const res = await request(app).get('/api/v1/cats');
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        catName: 'Thor',
        age: 2,
        favoriteToy: 'Socks'
      },
      {
        id: expect.any(String),
        catName: 'Liam',
        age: 2,
        favoriteToy: 'Catnip'
      },
      {
        id: expect.any(String),
        catName: 'LS',
        age: 4,
        favoriteToy: 'String'
      }
    ]);
  });

  it('should be able to update a cat', async () => {
    const cat = await Cat.insert({ catName: 'Thor', age: 2, favoriteToy: 'Socks' });
    const res = await request(app)
      .patch(`/api/v1/cats/${cat.id}`)
      .send({ catName: 'Liam', age: 2, favoriteToy: 'Catnip' });

    const expected = {
      id: expect.any(String),
      catName: 'Liam',
      age: 2,
      favoriteToy: 'Catnip',
    };
    expect(res.body).toEqual(expected);
    expect(await Cat.getById(cat.id)).toEqual(expected);
  });                                        

  it('should be able to delete a cat', async () => {
    const expected = await Cat.getById(1);
    const res = await request(app).delete(`/api/v1/cats/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
}); 
