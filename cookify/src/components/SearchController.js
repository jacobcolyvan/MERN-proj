// Logic for both searchbars: user recipes and spoonacular (finds recipes)
import React, {useEffect, useState} from 'react'
import SearchBar from './SearchBar'
import axios from 'axios'


const SearchController = () => {
  const APP_KEY = 'd712f788eec84018840ff6b7bc2abbdd';

  const [searchValue, setSearchValue] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [currentRecipes, setCurrentRecipes] = useState([])

  const getRecipes = async () => {

    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${APP_KEY}&addRecipeInformation=true`)
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
    console.log(currentRecipes);
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
      <div className='recipes'>
        {currentRecipes.map((recipe) => (
          <>
            <li>{(recipe.title)}</li>
            <img src={recipe.image} />
          </>
        ))}
      </div>
    </div>
  )

}

export default SearchController