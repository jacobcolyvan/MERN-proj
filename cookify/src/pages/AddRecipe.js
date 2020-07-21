// can add recipes from here to user's favorites
// adds to mongo user object is succsessful, and reroutes to new recipe page.

import React, { useContext, useEffect } from 'react';
import SearchController from '../components/SearchController';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const AddRecipe = ({ userRecipes, onUpdate }) => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <p>Add Recipe</p>
      <br />
      <SearchController userRecipes={userRecipes} onUpdate={onUpdate} />
    </div>
  );
};

export default AddRecipe;
