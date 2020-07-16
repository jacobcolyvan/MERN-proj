// can add recipes from here to user's favorites
// adds to mongo user object is succsessful, and reroutes to new recipe page. 

// import React from 'react'
import SearchController from '../components/SearchController'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


const AddRecipe = () => {
  const [userRecipes, setUserRecipes] = useState([])

  function requestUserData() {
    axios
    .get('http://localhost:3000/user/5f0d8f6f9420353e3e8da972')
    .then(res => {
        setUserRecipes(res.data.recipes)
        console.log(res.data.recipes)
    })
  }

  useEffect (() => {
    requestUserData()
  }, [])
  
  return (
    <div>
      <p>Add Recipe</p>
      <br/>
      <SearchController
        userRecipes={userRecipes}
      />
      
    </div>
  )
}

export default AddRecipe
