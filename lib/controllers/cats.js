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
  });
