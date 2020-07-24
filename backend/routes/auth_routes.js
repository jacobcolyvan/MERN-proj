const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const request = require('request');
const user = require('../models/user');

// authenticate user and get json web token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await userModel.findOne({ username });
    // if not the last res.json/res.etc, have to add a return
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid credentials (username)' }] });
    }

    //compare entered password to the stored hash password of a found user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid credentials (password)' }] });
    }

    const spotifyAuth = user.spotifyTokens.refresh.length > 1 ? true : false;
    const recipes = user.recipes;
    const _id = user.id;
    const payload = {
      user: {
        id: _id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, _id, recipes, spotifyAuth });
      }
    );
  } catch (error) {
    console.log('there was an error');
    res.status(500).send(error.message);
  }
});

// Create new user,
router.post('/register', async (req, res) => {
  const { username, password, recipes } = req.body;

  try {
    let check = await userModel.findOne({ username });
    if (check) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'username already taken' }] });
    }

    const salt = await bcrypt.genSalt(10); //create salt for password

    user = new userModel({
      username,
      password,
      recipes
    });

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log(user.recipes);
    const _id = user.id;
    const payload = {
      user: {
        id: _id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json('user created');
      }
    );

    // res.send(user);
  } catch (err) {
    console.log('there was an error in creating user');
    res.status(500).send(err.message);
  }
});

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await userModel.findById(verified.user.id);
    const spotifyAuth = user.spotifyTokens.refresh.length > 1 ? true : false;
    if (!user) return res.json(false);

    userObject = {
      isUser: true,
      token,
      _id: user._id,
      recipes: user.recipes,
      spotifyAuth
    };
    let isUser = true;
    return res.json(userObject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;