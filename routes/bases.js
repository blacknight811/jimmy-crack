var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const Base = require('../models/db-base')


/* GET bases listings */
router.get('/', async function (req, res, next) {
  console.log('ATTEMPTING TO GET ALL BASES FROM DB!')
  const bases = await Base.findAll()
  res.send(bases);
});

/* GET single base by id */
router.get('/:id', async function (req, res, next) {
  try {
    const base = await Bases.findByPk(req.params.id)
    if(!user) {
      res.send(404, `No base found for that id`)
    } else {
      res.send(base);
    }
  } catch(e) {
    res.status(500).send(`An error has occured: ${e}`)
  }
});
/* POST Create a new base */
router.post('/', async function (req, res, next) {
  const baseData = {
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    getLocation: req.body.getLocation,
    description: req.body.description,
  }
  let base;
  try {
    base = await Base.create(baseData)
    res.send(base.id);
  } catch(e) {
    res.status(500).send(e);
  }
});
/* PUT Update/Overwrite a base by id */
router.put('/:id', async function (req, res, next) {
  const id = req.params.id;
  const baseData = {
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    getLocation: req.body.getLocation,
    description: req.body.description,
  }
  let base;
  try {
    base = await Base.update(baseData, {where: {id}})
    res.send(base.id);
  } catch(e) {
    res.status(500).send(e);
  }
});
/* PATCH Update only select fields of a base by id */
router.patch('/:id', async function (req, res, next) {
  const id = req.params.id;

  const base = await Base.findByPk(id);

  const updatedBaseData = {...req.body}
    try {
      base.update(updatedBaseData)
      res.send(`Base ${base.id} has been updated`);
    } catch(e) {
      res.status(500).send(`An error occured while updating the base: ${e}`);
    }
});

module.exports = router;
