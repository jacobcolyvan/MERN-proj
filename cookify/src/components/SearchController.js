// Logic for both searchbars: user recipes and spoonacular (finds recipes)
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import RecipeTile from '../components/RecipeTile';
import { Link } from 'react-router-dom';

const SearchController = ({ userRecipes, onUpdate }) => {
  const [searchValue, setSearchValue] = useState('');
  // const [currentSearch, setCurrentSearch] = useState('')
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const getRecipes = async () => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&addRecipeInformation=true`
      )
      .then((res) => {
        // console.log(res.data.results);
        setCurrentRecipes(res.data.results);
        console.log('wallah hussy');
      })
      .catch((err) => {
        console.log(err);
        console.log('something wrong w/ spoonacular request');
      });
  };

  const saveRecipe = (index) => {
    const data = {
      newRecipe: {
        name: currentRecipes[index].title
      }
    };

    axios
      .put('http://localhost:3000/user/5f0d8f6f9420353e3e8da972', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
        console.log('recipe has been added');
        onUpdate();
      })
      .catch((err) => {
        console.log('somethings said no');
        console.log(err);
      });
  };

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={(newSearchValue) => {
          setSearchValue(newSearchValue);
        }}
        onEnter={getRecipes}
      />
      {currentRecipes.map((recipe, index) => (
        <Link
          to={`/recipes/${userRecipes.length - 1}`}
          key={`${recipe}-${index}`}
        >
          <RecipeTile
            key={`${recipe}-${index}`}
            title={recipe.title}
            image={recipe.image}
            saveRecipe={saveRecipe}
            index={index}
          />
        </Link>
      ))}
    </div>
  );
};

export default SearchController;
