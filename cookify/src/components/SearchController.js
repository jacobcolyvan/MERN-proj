// Logic for both searchbars: user recipes and spoonacular (finds recipes)

import React, { useState, useContext } from 'react';
import SearchBar from './SearchBar';
import UserContext from '../context/UserContext';
import axios from 'axios';
import RecipeTile from '../components/RecipeTile';
import { useHistory } from 'react-router-dom';

const SearchController = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentRecipes, setCurrentRecipes] = useState([]);

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  let userRecipes = userData.recipes;

  const getRecipes = async () => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&addRecipeInformation=true&fillIngredients=true`
      )
      .then((res) => {
        // console.log(res.data.results);
        console.log(res);
        setCurrentRecipes(res.data.results);
        console.log('wallah hussy, shes loaded');
      })
      .catch((err) => {
        console.log(err);
        console.log('something wrong w/ spoonacular request');
      });
  };

  const saveRecipe = async (index) => {
    const data = {
      newRecipe: {
        name: currentRecipes[index].title,
        image: currentRecipes[index].image,
        recipeUrl: currentRecipes[index].sourceUrl,
        cuisines: currentRecipes[index].cuisines,
        sourceName: currentRecipes[index].sourceName,
        summary: currentRecipes[index].summary,
        preptime: currentRecipes[index].preparationMinutes,
        cookingTime: currentRecipes[index].cookingMinutes,
        totalCookingTime: currentRecipes[index].readyInMinutes,
        ingredients: parseIngredients(currentRecipes[index].missedIngredients),
        dishTypes: currentRecipes[index].dishTypes,
        diets: currentRecipes[index].diets,
        instructions: currentRecipes[index].analyzedInstructions,
        winePairing: currentRecipes[index].winePairing
        // id: currentRecipes[index].id
      },
      id: userData.user
    };
    console.log(userData.token);
    await axios
      .put(`http://localhost:3000/users/recipes/add`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userData.token
        }
      })
      .then((data) => {
        console.log('recipe has been added');
        setUserData({
          token: userData.token,
          user: userData.user,
          recipes: data.data
        });
        history.push(`/recipes/${userRecipes.length-1}`);
      })
      .catch((err) => {
        console.log('somethings said no');
        console.log(err);
      });
  };

  const parseIngredients = (ingredients) => {
    let ingredientArray = [];
    ingredients.forEach((ingredient) => {
      ingredientArray.push({
        original: ingredient.original,
        ingredient: ingredient.originalName,
        ingredientAmount: `${ingredient.amount} ${ingredient.unitLong}`
      });
    });
    return ingredientArray;
  };

  console.log();

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={(newSearchValue) => {
          setSearchValue(newSearchValue);
        }}
        onEnter={getRecipes}
      />

      <RecipeTile saveRecipe={saveRecipe} recipes={currentRecipes} />
    </div>
  );
};

export default SearchController;
