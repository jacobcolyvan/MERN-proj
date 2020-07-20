const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// /auth
// authenticate user and get json web token
router.get('/login', async (req, res) => {
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

    // const username = user.username;
    const recipes = user.recipes;
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token, username, recipes });
      }
    );
  } catch (error) {
    console.log('there was an error');
    res.status(500).send(error.message);
  }
});

// Create new user,
router.post('/register', async (req, res) => {
  // const user = new userModel(req.body);

  const { username, password } = req.body;

  try {
    let check = await userModel.findOne({ username });
    // if not the last res.json/res.etc, have to add a return
    if (check) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'username already taken' }] });
    }

    const salt = await bcrypt.genSalt(10); //create salt for password

    user = new userModel({
      username,
      password
    });

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    const recipes = user.recipes;

    const payload = {
      user: {
        id: user.id
      }
    };

    //sign the payload using the secret from config > default.json
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, username, recipes });
      }
    );

    // res.send(user);
  } catch (err) {
    console.log('there was an error');
    res.status(500).send(err.message);
  }
});

// * NOT IN USE
//chuck middleware, so that you need a token to access the protected route
router.get('/', async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
