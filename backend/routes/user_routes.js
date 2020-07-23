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
      recipes: user.recipes
    });
  } catch {
    res.status(500).send(err);
    console.log('No user here');
  }
});

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
    console.log(user)
    console.log(user.recipes)
    console.log(req.body.recipeId, 'gg');
    let recipeIndex;
    user.recipes.forEach((recipe, index) => {
      console.log(recipe._id);
      if (recipe._id == req.body.recipeId) {
        console.log('they match!');
        recipeIndex = index;
      }
      // else throw
    });

   console.log(recipeIndex)
    let newRecipes;
    if (user.recipes.length === 1) {
      newRecipes = [];
    } else {
      newRecipes = user.recipes.splice(recipeIndex, 1);
    }

    await user.update({ recipes: newRecipes });
    console.log('done');
    res.send(newRecipes);
  } catch (err) {
    console.log('no deleting this time');
    res.status(400).send(err);
    console.log(err.message)
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
