import React from 'react';
import './RecipeTile.css';
import { Link } from 'react-router-dom';

//renders list of searched recipes

const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={`recipe${index}`} className='recipe'>
          <h3>{recipe.title}</h3>

          <div>
            <img className='image' src={recipe.image} alt='' />
          </div>
          <p>
            {recipe.diets.map((diet, index) => (
              <li key={`diet${index}`}>{diet}</li>
            ))}
          </p>
          <button
            onClick={() => {
              saveRecipe(index);
            }}
          >
            Favourite/Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeTile;
