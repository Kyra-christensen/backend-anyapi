const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    res.json(cat);
  })

  .get('/:id', async (req, res) => {
    const cat = await Cat.getById(req.params.id);
    res.json(cat);
  })

  .get('/', async (req, res) => {
    const cat = await Cat.getAll();
    res.json(cat);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const result = await Cat.getById(req.params.id);

      if (!result) {
        const error = new Error(`Cat ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const name = req.body.name ?? result.name;
      const age = req.body.age ?? result.age;
      const favoriteToy = req.body.favoriteToy ?? result.favoriteToy;

      const cat = await Cat.updateById(req.params.id, { name, age, favoriteToy });

      res.json(cat);
    } catch (error) {
      next(error);
    }

    
  });
