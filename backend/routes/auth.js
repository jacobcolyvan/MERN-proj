const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

//chuck middleware, so that you need a token to access the protected route
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
