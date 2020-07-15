// can add recipes from here to user's favorites
// adds to mongo user object is succsessful, and reroutes to new recipe page. 

import React from 'react'
import SearchController from '../components/SearchController'

const AddRecipe = () => {
  return (
    <div>
    Add Recipe
      <SearchController/>
      
    </div>
  )
}

export default AddRecipe
