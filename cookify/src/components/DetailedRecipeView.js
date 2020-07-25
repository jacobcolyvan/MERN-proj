import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
//shows detailed recipe info within ViewRecipe.js

const DetailedRecipeView = ({ recipe }) => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const deleteRecipe = async () => {
    try {
      const newRecipes = await axios.put(
        `http://localhost:3000/users/recipes/delete`,
        { id: userData.user, recipeId: recipe.id },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token
          }
        }
      );
      console.log('recipe has been added');
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: newRecipes.data
      });
      history.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className='recipeViewHeader'>{recipe.name}</h2>{' '}
      <img src={recipe.image} alt='' />
      <button onClick={deleteRecipe}>Delete</button>
      <div className='cookingTimes'>
        {recipe.preptime > 0 && <span>Prep Time: {recipe.preptime}</span>}
        {recipe.cookingMinutes > 0 && (
          <span>Cooking Time: {recipe.cookingMinutes}</span>
        )}
        {recipe.totalCookingTime > 0 && (
          <span>Total Cooking Time: {recipe.totalCookingTime}</span>
        )}
      </div>
      <p>{recipe.winePairing.length > 0 && <p>{recipe.winePairings}</p>}</p>
      <p>
        Source:{' '}
        <a href={recipe.recipeUrl} target='_blank' rel='noopener noreferrer'>
          {recipe.sourceName || 'here'}
        </a>
      </p>
      {recipe.diets.length > 0 && (
        <p>
          Diet categories:{' '}
          {recipe.diets.map((diet, index) => (
            <span key={`diet${index}`}>{diet}, </span>
          ))}
        </p>
      )}
      {recipe.cuisines.length > 0 && <p>Cuisines: {recipe.cuisines}</p>}
      <br />
      <p>
        Ingredients:
        {recipe.ingredients.map((ingredient, index) => (
          <li key={`ingredient${index}`}>{ingredient.original}</li>
        ))}
      </p>
      <br />
      {recipe.instructions.length > 0 && (
        <ol>
          Instructions: <div></div>
          {recipe.instructions[0].steps.map((steps, index) => (
            <li key={`step${index}`}>{steps.step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default DetailedRecipeView;
