const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    console.log('cat', cat);
    res.send(cat);
  })
  
  .get('/', async (req, res) => {
    const cat = await Cat.getAll();
    res.send(cat);
  })

  .get('/:id', async (req, res) => {
    const cat = await Cat.getById(req.params.id);
    res.send(cat);
  })


  .patch('/:id', async (req, res, next) => {
    try {
      const result = await Cat.getById(req.params.id);

      if (!result) {
        const error = new Error(`Cat ${req.params.id} not found`);
        error.status = 404;
        throw error;
      }

      const catName = req.body.catName ?? result.catName;
      const age = req.body.age ?? result.age;
      const favoriteToy = req.body.favoriteToy ?? result.favoriteToy;

      const cat = await Cat.updateById(req.params.id, { catName, age, favoriteToy });

      res.send(cat);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const cat = await Cat.deleteById(req.params.id);
    res.send(cat);
  });
