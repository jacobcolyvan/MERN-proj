const express = require('express')
const router = express.Router();
const userModel = require('../models/user')
const {
  getUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser
} = require('../controllers/users_controller')


// Get all
router.get('/users', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    console.log("there was an error");
    res.status(500).send(err);
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
    // if (!user) res.status(404).send("No user here")
    res.send(user)
  } catch {
    res.status(500).send(err)
    console.log("Not a valid user");
  }

})


// Create
router.post('/user', async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user)
  } catch (err) {
    console.log("there was an error");
    res.status(500).send(err)
  }
})



router.delete('/user/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id)

    if (!user) res.status(404).send("No user here")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})



// Update for recipes
router.put('/user/:id', async (req, res) => {
  try {
    // await userModel.findByIdAndUpdate(req.params.id, req.body)
    // await userModel.save()
    // res.send(user)

    const user = await userModel.findById(req.params.id);
    console.log(req.body.newRecipe);
    newRecipes = [...user.recipes, req.body.newRecipe]
    await user.update({ recipes: newRecipes })
    res.send(newRecipes)
    // res.send('Recipe added to user')
  } catch (err) {
    console.log("no way mon");
    res.status(400).send(err)
  }
})



//clear all users
// router.delete('/users', async (req, res) => {
//   try {
//     const user = await userModel.deleteMany({})
//     res.status(200).send()
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })



module.exports = router

