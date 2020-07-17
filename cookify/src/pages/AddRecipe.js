// can add recipes from here to user's favorites
// adds to mongo user object is succsessful, and reroutes to new recipe page. 

// import React from 'react'
import SearchController from '../components/SearchController'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


const AddRecipe = ({userRecipes, onUpdate}) => {
  
  
  return (
    <div>
      <p>Add Recipe</p>
      <br/>
      <SearchController
        userRecipes={userRecipes}
        onUpdate={onUpdate}
      />
      
    </div>
  )
}

export default AddRecipe
