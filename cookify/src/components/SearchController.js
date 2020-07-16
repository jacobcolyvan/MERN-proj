// Logic for both searchbars: user recipes and spoonacular (finds recipes)
import React, {useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import axios from 'axios'
import RecipeTile from '../components/RecipeTile'


const SearchController = () => {
  const APP_KEY = 'd712f788eec84018840ff6b7bc2abbdd';

  const [searchValue, setSearchValue] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [currentRecipes, setCurrentRecipes] = useState([])

  const getRecipes = async () => {
    // process.env
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&addRecipeInformation=true`)
    .then(res => {
      // console.log();
      // console.log(res.data.results);
      setCurrentRecipes((res.data.results))
      console.log("wallah hussy")
      
      // console.log(currentRecipes);
      
    })
    .catch( err => {
      console.log(err)
      console.log("something wrong w/ spoonacular request")
    })
    // console.log(currentRecipes);
  }
  

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={(newSearchValue) => {
          setSearchValue(newSearchValue)}
        }
        onEnter={getRecipes}
      />
    {currentRecipes.map((recipe) => (
      <RecipeTile 
        title={recipe.title}
        image={recipe.image}
      />
    ))}
      
    </div>
  )
}

export default SearchController