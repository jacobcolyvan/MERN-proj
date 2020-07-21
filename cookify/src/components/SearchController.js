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
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&addRecipeInformation=true`
      )
      .then((res) => {
        // console.log(res.data.results);
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
        name: currentRecipes[index].title
      },
      id: userData.user
    };
    console.log(userData.token);
    await axios
      .put(`http://localhost:3000/users/`, data, {
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
        history.push(`/recipes/${userRecipes.length - 1}`);
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
        // <Link
        //   to={`/recipes/${userRecipes.length - 1}`}
        //   key={`${recipe}-${index}`}
        // >
        <RecipeTile
          key={`${recipe}-${index}`}
          title={recipe.title}
          image={recipe.image}
          saveRecipe={saveRecipe}
          index={index}
        />
        // </Link>
      ))}
    </div>
  );
};

export default SearchController;
