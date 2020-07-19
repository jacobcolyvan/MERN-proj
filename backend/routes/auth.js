const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//chuck middleware, so that you need a token to access the protected route
router.get('/', auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// /auth
// authenticate user and get json web token

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await userModel.findOne({ username });
    // if not the last res.json/res.etc, have to add a return
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    //compare entered password to the stored hash password of a found user
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log('there was an error');
    res.status(500).send(error.message);
  }
});

module.exports = router;
