var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/db-user')


/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.findAll()
  res.send(users);
});

/* GET single user by id */
router.get('/:id', async function (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id)
    if(!user) {
      res.send(404, `No user found for that id`)
    } else {
      res.send(user);
    }
  } catch(e) {
    res.status(500).send(`An error has occured: ${e}`)
  }
});
/* POST Create a new user */
router.post('/', async function (req, res, next) {
  const password = await bcrypt.hash(req.body.password, 10);
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role || 'member',
    password,
  }
  let user;
  try {
    user = await User.create(userData)
    res.send(user.id);
  } catch(e) {
    res.status(500).send(e);
  }
});
/* PUT Update/Overwrite a user by id */
router.put('/:id', async function (req, res, next) {
  const id = req.params.id;
  const password = await bcrypt.hash(req.body.password, 10);
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role || 'member',
    password,
  }
  let user;
  try {
    user = await User.update(userData, {where: {id}})
    res.send(user.id);
  } catch(e) {
    res.status(500).send(e);
  }
});
/* PATCH Update only select fields of a user by id */
router.patch('/:id', async function (req, res, next) {
  const id = req.params.id;
  const password = req.body.password;

  const user = await User.findByPk(id);
  const passwordsMatch = await bcrypt.compare(password, user.password);

  const updatedUserData = {...req.body}
  if(updatedUserData.password) {
    delete updatedUserData.password;
  }
  if(passwordsMatch) {
    try {
      user.update(updatedUserData)
      res.send(`User ${user.id} has been updated`);
    } catch(e) {
      res.status(500).send(`An error occured while updating the user: ${e}`);
    }
  } else {
    res.status(403).send("Passed in current password is invalid");
  }
});
/* PATCH Update a users password by id */
router.patch('/password/:id', async function (req, res, next) {
  const id = req.params.id;
  const password = req.body.password;
  const updatedPassword = await bcrypt.hash(req.body.updatedPassword, 10);
  const user = await User.findByPk(id);
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if(passwordsMatch) {
    try {
      user.update({password: updatedPassword})
      res.send(`User ${user.id} has been updated`);
    } catch(e) {
      res.status(500).send(`An error occured while updating the user's password: ${e}`);
    }
  } else {
    res.status(403).send("Passed in current password is invalid");
  }
});

module.exports = router;
