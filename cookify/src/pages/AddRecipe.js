// can add recipes from here to user's favorites
// adds to mongo user object is succsessful, and reroutes to new recipe page. 

import React from 'react'
import SearchController from '../components/SearchController'
import { Redirect } from "react-router-dom";


const AddRecipe = ({userRecipes, onUpdate}) => {
  // const onAdd = () => {
    
  // }

  return (
    <div>
      <p>Add Recipe</p>
      <br/>
      <SearchController
        userRecipes={userRecipes}
        onAdd={onUpdate}
      />
      
    </div>
  )
}

export default AddRecipe
