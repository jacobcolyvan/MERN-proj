const express = require('express');
const userModel = require('../models/user')
const app = express();

app.get('/users', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    console.log("there was an error");
    res.status(500).send(err);
  }
})

app.post('/user', async (req, res) => {
  console.log(req.body);
  const user = new userModel(req.body);
  console.log(user);

  try {
    await user.save();
    res.send(user)
  } catch (err) {
    console.log("there was an error");
    res.status(500).send(err)
  }
})

module.exports = app

