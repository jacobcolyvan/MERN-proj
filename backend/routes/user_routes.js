const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const userModel = require('../models/user');

// router.get('/users/:id', auth, async (req, res) => {
//   try {
//     const user = await userModel.findById(req.params.id);
//     // if (!user) res.status(404).send("No user here")
//     res.send(user);
//   } catch {
//     res.status(500).send(err);
//     console.log('No user here');
//   }
// });

router.get('/user', auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    res.json({
      username: user.username,
      user: user.id,
      recipes: user.recipes,
    });
  } catch {
    res.status(500).send(err);
    console.log('No user here');
  }
});

//edit an account
router.put('/user/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.newUsername);
    const user = await userModel.findById(req.params.id);

    if (req.body.newUsername) {
      await user.update({ username: req.body.newUsername });
    }
    if (req.body.newPassword) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials (password)' }] });
      }

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(req.body.newPassword, salt);

      await user.update({ password: newPassword })
      res.status(200).send();
    }
    //check current password matches hashed password and then update with new password

    console.log(user);

    // newUsername = req.body.newUsername
    //  newUsername = req.

    // await user.update({ username: newUsername });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete an account
router.delete('/user/:id', auth, async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) res.status(404).send('No user here');
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update for recipes
// @ private
router.put('/users/recipes/add', auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    // console.log(req.body.newRecipe);
    newRecipes = [...user.recipes, req.body.newRecipe];
    await user.update({ recipes: newRecipes });
    res.send(newRecipes);
    // res.send('Recipe added to user')
  } catch (err) {
    console.log('no adding nothing mon');
    res.status(400).send(err);
  }
});

//delete recipes
router.put('/users/recipes/delete', auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    console.log(user.id);
    console.log(req.body.recipeId, 'gg');
    let recipeIndex = null;
    user.recipes.forEach((recipe, index) => {
      console.log(recipe.id);
      if (recipe.id == req.body.recipeId) {
        console.log('they match!');
        recipeIndex = index;
      }
    });

    if (recipeIndex === null) throw 'no recipe with given id found';
    let newRecipes = user.recipes;
    newRecipes.splice(recipeIndex, 1);

    await user.update({ recipes: newRecipes });
    console.log('done');
    res.send(newRecipes);
  } catch (err) {
    console.log('no deleting this time');
    res.status(400).send(err);
    console.log(err.message);
  }
});

module.exports = router;

// // get user recipes
// // @private
// router.get('/users/recipes/', auth, async (req, res) => {
//   try {
//     const user = await userModel.findById(req.id);
//     res.send(user.recipes);
//   } catch {
//     res.status(500).send(err);
//     console.log('No user here');
//   }
// });
