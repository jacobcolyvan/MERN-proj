const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userModel = require('../models/user');

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
    await user.updateOne({ recipes: newRecipes });
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

    let recipeIndex = user.recipes.findIndex(
      (recipe) => recipe._id == req.body.recipeId
    );

    if (recipeIndex === null) throw 'no recipe with given id found';
    let newRecipes = user.recipes;
    newRecipes.splice(recipeIndex, 1);

    await user.updateOne({ recipes: newRecipes });
    res.status(200).send(newRecipes);
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
